const express = require(`express`)
const router = express.Router()
const controller = require(`../controllers/indexController`)

/* GET home page. */
router.get(`/`, controller.homePage)
router.get(`/9339/finish/:id`, controller.nextSteps)
router.get(`/9339/start/:id`, controller.startSurvey)

module.exports = router
