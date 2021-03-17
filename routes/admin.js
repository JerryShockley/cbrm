const express = require(`express`)
const router = express.Router()
const controller = require(`../controllers/adminController`)

router.get(`/`, controller.adminDashboard)
router.get(`/search/respondent/new`, controller.adminRespondentNewSearch)
router.post(`/search/respondent/create`, controller.adminRespondentCreateSearch)
router.get(`/search/project/new`, controller.adminProjectNewSearch)
router.post(`/search/project/create`, controller.adminProjectCreateSearch)

module.exports = router
