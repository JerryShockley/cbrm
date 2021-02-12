/* eslint-disable quotes */
module.exports = {
  apps: [
    {
      name: "cbrm",
      script: "./bin/index.js",
      watch: ".",
      watch_delay: 1000,
      ignore_watch: ["./node_modules"],
      wait_ready: "true",
      env: {
        PORT: 3001,
        NODE_ENV: "development",
      },
      env_prod: {
        PORT: 80,
        NODE_ENV: "production",
      },
    },
    // {
    //   script: "./service-worker/",
    //   watch: ["./service-worker"],
    // },
  ],
}
