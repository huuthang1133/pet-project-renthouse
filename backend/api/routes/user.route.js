const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth.middleware')

let userController = require('../controllers/user.controller')

router.get('/', userController.getAll)
router.post('/register', userController.createUser)
router.post('/login', userController.login)
router.post('/refresh_token', userController.refreshToken)
router.get('/logout', userController.logout)
router.get('/infor', auth, userController.getUser)

module.exports = router