const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth.middleware')
const authAdmin = require('../middleware/authAdmin.middleware')
const supportController = require('../controllers/support.controller')

router.get('/', supportController.getAll)
router.post('/', auth, supportController.createSupports)
router.delete('/:supportId', auth, authAdmin, supportController.deleteSupports)
router.patch('/:supportId', supportController.updateSupports)

module.exports = router