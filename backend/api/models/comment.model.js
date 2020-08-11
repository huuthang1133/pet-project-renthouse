const mongoose = require('mongoose');

const cmtsSchema = mongoose.Schema({
    idUser: String,
    comment: String
})

let Comment = mongoose.model('Comment', cmtsSchema, "comments");
module.exports = Comment;