const db = require(`../models/index`)

let initialized = false
const initialRespondentId = 1000
const initialProjectId = 100
let respondentId = 0
let projectId = 0

if (!initialized) {
  fetchMaxIds()
}
// Initializes nextRespondentId and nextProjectId with the current max value in
// the db + 1.
function fetchMaxIds() {
  Promise.all([db.Respondent.max(`respondentId`), db.Project.max(`projectId`)])
    .then((data) => {
      // Handle the case of no Respondent records.
      respondentId = (data[0] ? data[0] : initialRespondentId) + 1
      projectId = (data[1] ? data[1] : initialProjectId) + 1
      initialized = true
      console.log(
        `Idfactory initialized: projectId = ${projectId}, respondentId = ${respondentId}`
      )
    })
    .catch((err) => {
      console.error(`idfactory failed to initialize: ${err.message}`)
      process.kill(process.pid, `sigint`)
    })
}

function nextRespondentId() {
  respondentId += 1
  return respondentId - 1
}

function nextProjectId() {
  projectId += 1
  return projectId - 1
}

module.exports = {
  nextRespondentId,
  nextProjectId,
}
