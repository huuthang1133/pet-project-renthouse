const mongoose = require('mongoose');

const transSchema = mongoose.Schema({
    userId: String,
    room: {
    	_id: String,
    	isVacancy: Boolean,
    	name: String
    },
    isFinish:Boolean,
    rent_date : String,
    bills: [{
    	price: Object,
    	isComplete: Boolean,
    	bill_date: String,
    	comment: [{
    		content: String
    	}]    	
    }]  
})

let Transaction = mongoose.model('Transaction', transSchema, "transactions");
module.exports = Transaction