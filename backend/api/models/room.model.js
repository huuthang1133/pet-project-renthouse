const mongoose = require('mongoose');

const roomsSchema = mongoose.Schema({
    isVacancy: {
        type: Boolean,
        required: true,
        default: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80"
    },
    name: {
        type: String,
        required: true
    },
    square: {
        type: Number,
        required: true
    }
}, {timestamps: true})

let Room = mongoose.model('Room', roomsSchema, "rooms");
module.exports = Room;