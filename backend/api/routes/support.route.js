const express = require("express")
const router = express.Router()
const supportController = require('../controllers/support.controller')

router.get('/', supportController.getAll)
router.post('/', supportController.createSupports)
router.delete('/:supportId', supportController.deleteSupports)
router.patch('/:supportId', supportController.updateSupports)

module.exports = router