const express = require(`express`)
const router = express.Router()
const controller = require(`../controllers/adminController`)

router.get(`/3355`, controller.adminDashboard)

module.exports = router
