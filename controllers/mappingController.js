const Model = require(`../models/mapping`)
// const sql = require(`/bin/index.js`)
const data = []
let respondentId = 0

exports.mappingNew = (req, res) => {
  res.render(`mapping/new`, {
    title: `New Relationship Mapping`,
    myprompt: `A very good prompt that tells you what to do!`,
  })
}

exports.mappingCreate = (req, res) => {
  console.log(JSON.stringify(req.body, null, 2))
  respondentId += 1
  data.push(req.body.points)
  res.json({ location: `/mappings/${respondentId}` })
}

exports.mappingShow = (req, res) => {
  // respondent = Respondent.build
  const { id } = req.params
  res.render(`mapping/show`, {
    points: data[id - 1],
    title: `Relationship Mapping for Respondent #${id}`,
  })
}
