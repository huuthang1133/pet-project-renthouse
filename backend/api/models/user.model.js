const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: String,
	username: String,
	password: String,
	fullName: String,
	isAdmin: false
})

let User = mongoose.model('User', userSchema, "users");
module.exports = User