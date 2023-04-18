/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');

module.exports = {
	experimental: {
    outputStandalone: true,
  },
	env: {
		APP_URL: 'http://localhost:3000',
		API_URL: 'https://localhost:49153/api',
		USER_ID: '4f959a9c-b9d1-406b-b1ad-886c550066bf'
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
