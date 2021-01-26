const mongoose = require('mongoose');

const supportSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    transaction: {
        type: String,
        required: true,
        ref: 'Transaction'
    },
    isComplete: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true})

let Support = mongoose.model('Support', supportSchema, "supports");
module.exports = Support;