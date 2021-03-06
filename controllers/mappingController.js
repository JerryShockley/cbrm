const db = require(`../models/index`)
const Mapping = require(`../models/mapping`)
const { nextRespondentId } = require(`../lib/idFactory`)

exports.mappingNew = (req, res) => {
  res.render(`mapping/new`, {
    title: `New Relationship Mapping`,
    myprompt: `A very good prompt that tells you what to do!`,
  })
}

exports.mappingCreate = async (req, res) => {
  console.log(JSON.stringify(req.body, null, 2))
  const { points } = req.body
  db.Respondent.create(
    {
      projectId: 1,
      respondentId: nextRespondentId(),
      durationSum: db.Respondent.sumMappingDurations(points),
      pointCount: db.Respondent.getMappingsCount(points),
      mappings: points,
    },
    {
      include: [`mappings`],
    }
  )
    .then((respondent) => {
      console.log(`finished create`)
      res.json({ location: `/mappings/${respondent.id}` })
    })
    .catch((err) => {
      console.error(`failed to create respondent: ${err.message}`)
      process.kill(process.pid, `sigint`)
    })
}

exports.mappingShow = async (req, res) => {
  // respondent = Respondent.build
  const { id } = req.params
  db.Respondent.findByPk(id, { include: `mappings` })
    .then((respondent) => {
      res.render(`mapping/show`, {
        points: respondent.mappings,
        duration: respondent.getDurationString(),
        title: `Relationship Mapping for Respondent #${respondent.respondentId}`,
      })
    })
    .catch((err) => {
      console.error(`Failed to find Respondent: ${err}`)
    })
}
