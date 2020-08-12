const express = require('express');
const router = express.Router();

const controllers = require('../controllers/login.controller');


router.get('/', controllers.index);
router.post('/', controllers.postLogin);

module.exports = router;