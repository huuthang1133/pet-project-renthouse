const mongoose = require('mongoose');

const transSchema = mongoose.Schema({
    userId: String,
    roomId: String,
    isFinish:Boolean,
    rent_date : String
})

let Transaction = mongoose.model('Transaction', transSchema, "transactions");
module.exports = Transaction