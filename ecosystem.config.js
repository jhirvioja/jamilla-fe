module.exports = {
  apps: [
    {
      name: 'Jamilla Recipe App Frontend',
      script: './node_modules/next/dist/bin/next',
      args: 'start -p ' + (process.env.PORT || 8080),
      watch: false,
      autorestart: true,
    },
  ],
}
