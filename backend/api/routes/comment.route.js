const express = require("express")
const router = express.Router()
const cmtController = require('../controllers/comment.controller')
const auth = require('../middleware/auth.middleware')
const authAdmin = require('../middleware/auth.middleware')

router.get('/', auth, authAdmin, cmtController.getAll)
router.post('/', auth, cmtController.createCmts)
router.delete('/:cmtId', cmtController.deleteCmts)
router.patch('/:cmtId', cmtController.updateCmts)

module.exports = router