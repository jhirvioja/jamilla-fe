/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');

module.exports = {
	experimental: {
    outputStandalone: true,
  },
  images: {
    domains: [ // Not sure if this is necessary, but I am going to assume it is
      'https://i.imgur.com',
      'i.imgur.com',
      'https://imgur.com',
      'imgur.com',
    ],
  },
  reactStrictMode: true,
	i18n,
}
