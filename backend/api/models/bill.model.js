const mongoose = require('mongoose');

const BillSchema = mongoose.Schema({
    price: {
        electric: {
            type: Number,
            required: true
        },
        water: {
            type: Number,
            required: true
        },
        room: {
            type: Number,
            required: true
        }
    },
    isComplete: {
        type: Boolean,
        default: false,
        required: true
    },
    isProcessing: {
        type: Boolean,
        default: false,
        required: true
    },
    bill_date: {
        type: String, 
        required: true
    },
    comment: {
        content: {
            type: String
        },
        isUpdate: {
            type: Boolean,
            default: false
        }
    },
    transaction: {
        type: String,
        required: true,
        ref: "Transaction"
    }
}, {timestamps: true})

let Bill = mongoose.model('Bill', BillSchema, "bills");
module.exports = Bill