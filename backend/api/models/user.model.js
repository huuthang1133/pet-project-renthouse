const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	fullName: {
		type: String,
		required: true
	},
	isAdmin: { 
		type: Boolean,
		default: false, 
		required: true
	}
}, { timestamps : true} )

let User = mongoose.model('User', userSchema, "users");
module.exports = User