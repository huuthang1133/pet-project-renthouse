const mongoose = require('mongoose');

const roomsSchema = mongoose.Schema({
    isVacancy: Boolean
    name: String
})

let Room = mongoose.model('Room', roomsSchema, "rooms");
module.exports = Room;