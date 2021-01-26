const express = require("express")
const router = express.Router()
const tranController = require('../controllers/transaction.controller')
const auth = require('../middleware/auth.middleware')
const authAdmin = require('../middleware/authAdmin.middleware')

router.get('/', auth, authAdmin,  tranController.getAll)
router.get('/user', auth, tranController.getTrans)
router.post('/', auth,  tranController.createTrans)

module.exports = router