const express = require("express")
const router = express.Router()
const cmtController = require('../controllers/comment.controller')

router.get('/', cmtController.getAll)
router.post('/', cmtController.createCmts)
router.delete('/:cmtId', cmtController.deleteCmts)
router.patch('/:cmtId', cmtController.updateCmts)

module.exports = router