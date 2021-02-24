const Model = require(`../models/mapping`)
// const sql = require(`/bin/index.js`)
const data = []
let respondentId = 0

exports.mappingNew = (req, res) => {
  res.render(`mapping/edit`, {
    title: `New Relationship Mapping`,
    myprompt: `A very good prompt that tells you what to do!`,
  })
}

exports.mappingPost = (req, res) => {
  console.log(JSON.Stringify(`req.body`, null, 2))
  respondentId += 1
  data.push(req.body)
  res.render(`mapping/show/${respondentId}`)
}

exports.mappingShow = (req, res) => {
  // respondent = Respondent.build
  console.log(strPoints)
  const { id } = req.params
  res.render(`mapping/show`, {
    points: data[id - 1],
    title: `Relationship Mapping for: ${respondentId}`,
  })
}
