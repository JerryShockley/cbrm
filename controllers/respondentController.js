const db = require(`../models/index`)
const { nextRespondentId } = require(`../lib/idFactory`)

exports.respondentNew = async(req, res) => {
  const { id: project_id } = req.params
  try {
    project = await db.Project.findByPk(project_id, { attributes: [`mapPrompt`] })
    res.render(`respondent/new`, {
      title: `New Relationship Mapping`,
      myprompt: project.mapPrompt,
      project_id: project_id
    })
  } catch(err) {
      console.error(`failed to lookup new respondent prompt: ${err.message}`)
  }
}

exports.respondentCreate = (req, res) => {
  console.log(JSON.stringify(req.body, null, 2))
  const { points, project_id } = req.body
  db.Respondent.create(
    {
      project_id: project_id,
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
      res.json({ location: `/finish/${respondent.id}` })
    })
    .catch((err) => {
      console.error(`failed to create respondent: ${err.message}`)
      process.kill(process.pid, `sigint`)
    })
}

exports.respondentShow = (req, res) => {
  // respondent = Respondent.build
  const { id } = req.params
  db.Respondent.findByPk(id, { include: `mappings` })
    .then((respondent) => {
      res.render(`respondent/show`, {
        createDate: respondent.createdAt.toDateString(),
        points: respondent.mappings,
        duration: respondent.getDurationString(),
        title: `Relationship Mapping for Respondent #${respondent.respondentId}`,
        respondent_id: id,
      })
    })
    .catch((err) => {
      console.error(`Failed to find Respondent: ${err}`)
    })
}
