const express = require("express")
const router = express.Router()
const tranController = require('../controllers/transaction.controller')

router.get('/', tranController.getAll)
router.post('/', tranController.createTrans)
router.delete('/:transactionId', tranController.deleteTrans)
router.patch('/:transactionId', tranController.updateTrans)

module.exports = router