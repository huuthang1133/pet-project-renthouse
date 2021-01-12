const express = require("express")
const router = express.Router()
const tranController = require('../controllers/transaction.controller')
const auth = require('../middleware/auth.middleware')
const authAdmin = require('../middleware/authAdmin.middleware')

router.get('/', tranController.getAll)
router.get('/:userId', tranController.getTrans)
router.post('/', auth, tranController.createTrans)
router.delete('/:transactionId', auth, authAdmin, tranController.deleteTrans)
router.patch('/:transactionId', auth, tranController.updateTrans)
router.patch('/updatebill/:transactionId', auth, authAdmin, tranController.updateBill)

module.exports = router