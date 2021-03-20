const express = require(`express`)
const router = express.Router()
const controller = require(`../controllers/projectController`)

/* GET users listing. */
router.get(`/list`, controller.projectList)
router.get(`/listdata`, controller.projectListData)
router.get(`/new`, controller.projectNew)
router.post(`/create`, controller.projectCreate)
router.post(`/update/:id`, controller.projectUpdate)
router.get(`/edit/:id`, controller.projectEdit)
router.get(`/:id`, controller.projectShow)

module.exports = router
