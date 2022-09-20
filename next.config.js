/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');

module.exports = {
	env: {
		REACT_APP_URL: 'http://localhost:3000',
		API_URL: 'http://localhost:5184'
	},
  images: {
    domains: [
      'https://i.imgur.com',
      'i.imgur.com',
      'https://imgur.com',
      'imgur.com',
    ], // Not sure if this is necessary, but I am going to assume it is
  },
  reactStrictMode: true,
	i18n,
}
