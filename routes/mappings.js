const express = require(`express`)
const router = express.Router()
const controller = require(`../controllers/mappingController`)

router.get(`/list`, controller.mappingList)
router.get(`/listdata`, controller.mappingListData)

module.exports = router
