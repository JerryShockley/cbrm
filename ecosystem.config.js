/* eslint-disable quotes */
module.exports = {
  apps: [
    {
      name: "cbrm",
      script: "./bin/index.js",
      watch: [
        "models",
        "controllers",
        "views",
        "lib",
        "routes",
        "bin",
        "app.js",
      ],
      ignore_watch: [".git", "node_modules", ".git/index.lock"],
      watch_delay: 1000,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 80,
      },
    },
  ],
}
