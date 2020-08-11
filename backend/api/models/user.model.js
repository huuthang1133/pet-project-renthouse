const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    fullName:String
})

let User = mongoose.model('User', userSchema, "users");
module.exports = User