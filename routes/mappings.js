const express = require(`express`)
const router = express.Router()
// const sql = require(`/bin/index.js`)
const data = []
let respondentId = 0

router.get(`/new`, (req, res) => {
  res.render(`mapping`, {
    jsFile: `mapping_new.js`,
    title: `New Relationship Mapping`,
  })
})

router.post(`/`, (req, res) => {
  // req.body.forEach((mapping) => {})
  respondentId += 1
  data.push(req.body)
  res.status(200)
  // res.json({
  //   message: `Data saved successfully.`,
  //   location: `/mappings/${respondentId}`,
  // })
  res.render(`mapping/${respondentId}`)
})

router.get(`/:id`, (res, req) => {
  // respondent = Respondent.build
  const { id } = req.params
  const strPoints = JSON.stringify(data[id - 1])
  console.log(strPoints)
  res.render(`/mapping`, {
    points: strPoints,
    jsFile: `mapping_show.js`,
    title: `Relationship Mapping for: ${respondentId}`,
  })
})
/* GET users listing. */
// router.get(`/`, (req, res) => {
//   res.send(`respond with a resource`)
// })

module.exports = router
