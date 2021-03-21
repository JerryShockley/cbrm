const express = require(`express`)
const router = express.Router()
const controller = require(`../controllers/indexController`)

/* GET home page. */
router.get(`/`, controller.homePage)
router.get(`/finish/:id`, controller.nextSteps)
router.get(`/start/:id`, controller.startSurvey)

module.exports = router
