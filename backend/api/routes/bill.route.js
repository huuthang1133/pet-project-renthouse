const express = require("express")
const router = express.Router()
const billController = require('../controllers/bill.controller')

router.get('/', billController.getAll)
router.post('/', billController.createBills)
router.delete('/:billId', billController.deleteBills)
router.patch('/:billId', billController.updateBills)

module.exports = router