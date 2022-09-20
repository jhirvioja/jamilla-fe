# Jamilla Recipe Book App Frontend

An accessible React + Next.js + Tailwind CSS Recipe Book App!

## Features

- Mock landing page
- Browse recipes as cards, paginated to pages
- Browse one recipe
- Recipe instructions flow: step-by-step, ability to quickly peep at the ingredients during recipe flow
- Strikethroughable ingredient list which persists to localStorage (user can quit browser, or session can timeout without losing progress)
- Add a recipe: ingredients with an unit and a value, step-by-step instructions
- Edit & delete a recipe
- One keyword search, which does a search on recipe's name & hashtags which are provided with the recipe
- Dark theme
- Ability to modifiy font weight, line height, letter spacing
- Settings, where you can persist user settings to localStorage
- Internationalization, en & fi languages can be found as common.json files at the /locales -folder
- Some Playwright tests located in /tests -folder - note that you'll have to reach the right url's for them to work
- Accessibility - not exhaustive but developed with that mindset

## Local Deployment

Backend can be found at a different repo and is advised to deploy first. Take the backend address and add it to `next.config.js` env-settings as `API_URL`.

For the frontend:

1. Select the correct Node version (v.17.5.0)

`nvm use`

2. Install dependencies:

`npm install`

3. Run locally:

`npm run dev`

4. Code!

### Other

- Tests can be run with headless `npm run test:e2e` or headed with `npm run test:e2e:headed`
- Build an optimized version with `npm run build`, start the optimized version with `npm run start`
