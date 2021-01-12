const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	fullName: {
		type: String,
		require: true
	},
	isAdmin: { 
		type: Boolean,
		default: false, 
		require: true
	}
}, { timestamps : true} )

let User = mongoose.model('User', userSchema, "users");
module.exports = User