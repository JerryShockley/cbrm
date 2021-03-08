const express = require(`express`)
const router = express.Router()
const controller = require(`../controllers/adminController`)

router.get(`/search/respondent/new`, controller.adminRespondentNewSearch)
router.post(`/search/respondent/create`, controller.adminRespondentCreateSearch)

module.exports = router
