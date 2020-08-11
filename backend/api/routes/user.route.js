const express = require('express')
const router = express.Router();

let userController = require('../controllers/user.controller')

router.get('/', userController.getAll)
router.post('/', userController.createUser)

module.exports = router