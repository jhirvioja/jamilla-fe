FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder

# We need to add ENV's here so that they will be exposed to the container that runs in App Service
# Somehow it is not enough that you have the environment variables in App Service's "Application settings"
# I believe this is because of Next's client side / server side config, and they are not exposed to client side
# NOTE! Any secrets should go to the server side via "Application settings" so they are not in the image
ENV API_URL=https://app-jamilla-be.azurewebsites.net/api
ENV APP_URL=https://jamilla.azurewebsites.net
ENV USER_ID=4f959a9c-b9d1-406b-b1ad-886c550066bf

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next's telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Disable Next's telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

CMD ["node_modules/.bin/next", "start", "-p", "3000"]