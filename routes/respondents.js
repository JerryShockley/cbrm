const express = require(`express`)
const router = express.Router()
const controller = require(`../controllers/respondentController`)

router.get(`/list`, controller.respondentList)
router.get(`/listdata`, controller.respondentListData)
// Post date from new respondent
router.post(`/create`, controller.respondentCreate)
// Create new respondent
router.get(`/new/:id`, controller.respondentNew)
// Show respondent
router.get(`/:id`, controller.respondentShow)

module.exports = router
