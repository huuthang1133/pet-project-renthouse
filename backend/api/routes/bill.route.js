const express = require("express")
const router = express.Router()
const billController = require('../controllers/bill.controller')
const auth = require('../middleware/auth.middleware')
const authAdmin = require('../middleware/authAdmin.middleware')

router.get('/', auth, authAdmin, billController.getAll)
router.get('/:id', auth, billController.getBill)
router.post('/', auth, authAdmin, billController.createBill)
// router.delete('/:id', auth, authAdmin, billController.deleteCmts)
router.patch('/comment/:id', auth, billController.createCommentBill)
router.patch('/:id', billController.updateBill)
router.get('/payment/:id', auth, billController.userPayment)
router.get('/confirm/:id', auth, authAdmin, billController.confirmPayment)

module.exports = router