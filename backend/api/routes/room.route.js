const express = require('express');
const router = express.Router();

const controllers = require('../controllers/room.controller');

router.get('/', controllers.getAll);
router.post('/', controllers.createRooms);
router.patch('/:roomId', controllers.updateRooms)

module.exports = router;