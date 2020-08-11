const mongoose = require('mongoose');

const billsSchema = mongoose.Schema({
    name: String,
    price: String,
    isComplete: Boolean,
    transactionId: String,
    bill_date: String,
    idComment: String
})

let Bill = mongoose.model('Bill', billsSchema, "bills");
module.exports = Bill