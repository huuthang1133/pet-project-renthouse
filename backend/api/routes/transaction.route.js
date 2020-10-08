const express = require("express")
const router = express.Router()
const tranController = require('../controllers/transaction.controller')

router.get('/', tranController.getAll)
router.get('/:userId', tranController.getTrans)
router.post('/', tranController.createTrans)
router.delete('/:transactionId', tranController.deleteTrans)
router.patch('/:transactionId', tranController.updateTrans)
router.patch('/updatebill/:transactionId', tranController.updateBill)

module.exports = router