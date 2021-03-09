/* eslint-disable quotes */
module.exports = {
  apps: [
    {
      name: "cbrm",
      script: "./bin/index.js",
      watch: ["./"],
      watch_delay: 1000,
      ignore_watch: ["./node_modules"],
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        "PORT": 80,
      },
    },
  ],
}
