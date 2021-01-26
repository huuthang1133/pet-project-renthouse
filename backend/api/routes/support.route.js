const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth.middleware')
const authAdmin = require('../middleware/authAdmin.middleware')
const supportController = require('../controllers/support.controller')

router.get('/', auth, authAdmin, supportController.getAll)
router.get('/user/:id', auth, supportController.getSupport)
router.post('/:id', auth, supportController.createSupports)
router.delete('/:supportId', auth, authAdmin, supportController.deleteSupports)
router.patch('/:id', supportController.updateSupports)

module.exports = router