const express = require(`express`)
const router = express.Router()

router.get(`/new`, (req, res) => {
  res.render(`mapping`, { title: `Relationship Mapping` })
})

/* GET users listing. */
// router.get(`/`, (req, res) => {
//   res.send(`respond with a resource`)
// })

module.exports = router
