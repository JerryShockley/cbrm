#!/usr/bin/env node

/**
 * Module dependencies.
 */
/* eslint-disable no-console */
const app = require(`../app`)
const debug = require(`debug`)(`cbrm:server`)
const http = require(`http`)
const Sql = require(`sequelize`)
const mode = process.env.NODE_ENV || `development`
const config = require(`${__dirname}/../config/config.json`)[mode]
const sql = new Sql(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
})

sql
  .authenticate()
  .then(() => {
    console.log(`DB connection established successfully`)
  })
  .catch((err) => {
    console.log(`Failed to establish DB connection!\n${err}`)
  })

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || `8090`)
app.set(`port`, port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on(`error`, onError)
server.on(`listening`, onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const tmpPort = parseInt(val, 10)

  if (Number.isNaN(tmpPort)) {
    // named pipe
    return val
  }

  if (tmpPort >= 0) {
    // tmpPort number
    return tmpPort
  }
  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== `listen`) {
    throw error
  }

  const bind = typeof port === `string` ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case `EACCES`:
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case `EADDRINUSE`:
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()
  const bind = typeof addr === `string` ? `pipe ${addr}` : `port ${addr.port}`
  debug(`Listening on ${bind}`)
}

// Use gratefull shutdown with PM2, Forever, etc.
async function gracefulShutdown(signal) {
  console.log(`Received '${signal}'...Shutting down.`)
  await sql.close().then(() => {
    console.log(`DB server shutdown successfully`)
  })
  await server.close(async () => {
    console.log(`NodeJS server is shutdown successfully.`)
    process.exit(0)
  })
}

process.on(`SIGINT`, () => {
  gracefulShutdown(`SIGINT`)
})
process.on(`SIGTERM`, () => {
  process.exit(1)
})
process.on(`SIGHUP`, () => {
  gracefulShutdown(`SIGHUP`)
})

module.exports.sql = sql
