const express = require('express')
const router = express.Router();

let userController = require('../controllers/user.controller')

router.get('/', userController.getAll)
router.post('/register', userController.createUser)
router.post('/login', userController.login)
router.get('/refresh_token', userController.refreshToken)
router.get('/logout', userController.logout)

module.exports = router