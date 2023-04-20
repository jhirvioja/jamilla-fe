/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');

module.exports = {
	experimental: {
    outputStandalone: true,
  },
	env: {
		APP_URL: process.env.APP_URL,
		API_URL: process.env.API_URL,
		USER_ID: process.env.USER_ID
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
