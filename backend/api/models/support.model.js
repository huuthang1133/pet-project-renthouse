const mongoose = require('mongoose');

const supportSchema = mongoose.Schema({
    content: String,
    transactionId: String,
})

let Support = mongoose.model('Support', supportSchema, "supports");
module.exports = Support;