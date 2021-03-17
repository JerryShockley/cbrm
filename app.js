/* eslint-disable no-console */
const createError = require(`http-errors`)
const express = require(`express`)
const path = require(`path`)
const logger = require(`morgan`)

const indexRouter = require(`./routes/index`)
const projectsRouter = require(`./routes/projects`)
const respondentsRouter = require(`./routes/respondents`)
const mappingsRouter = require(`./routes/mappings`)
const adminRouter = require(`./routes/admin`)

const app = express()

// view engine setup
app.set(`views`, path.join(__dirname, `views`))
app.set(`view engine`, `pug`)

app.use(logger(`dev`))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, `public`)))

app.use(`/projects`, projectsRouter)
app.use(`/respondents`, respondentsRouter)
app.use(`/mappings`, mappingsRouter)
app.use(`/admin`, adminRouter)
app.use(`/`, indexRouter)

// Set static html file path
app.use(express.static(`public`))
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get(`env`) === `development` ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render(`error`)
})

module.exports = app
