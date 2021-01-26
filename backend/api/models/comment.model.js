const mongoose = require('mongoose');

const cmtsSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {timestamps: true})

let Comment = mongoose.model('Comment', cmtsSchema, "comments");
module.exports = Comment;