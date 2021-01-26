const mongoose = require('mongoose');

const transSchema = mongoose.Schema({
    user: {
		type: String,
		required: true,
		ref: 'User'
	},
    room: {
		type: String,
		ref: 'Room',
		required: true,
    },
    isFinish: {
		type: Boolean,
		required: true,
		default: false
	},
    rent_date : {
		type: String,
		required: true,
		default: new Date()
	},
    bills: [
		{
			bill: {
				type: String,
				required: true,
				ref: 'Bill',
				comment: {
					type: String,
					ref: 'Comment'
				}
			}
		}
	]
}, {timestamps: true})

let Transaction = mongoose.model('Transaction', transSchema, "transactions");
module.exports = Transaction