const Comment = require('../models/comment.model');

module.exports.getAll = (req, res)=>{
    Comment.find()
    .exec()
    .then(docs =>{
        console.log(docs)
        res.status(200).json(docs)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
}

module.exports.createCmts = (req, res)=>{
    const comment = new Comment({
        idUser: req.body.userId,
        comment: req.body.comment,
    })
    comment.save()
    .then(result=>{
        res.status(201).json({
            message: "Created post successfully"
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

module.exports.updateCmts = (req, res)=>{
    const id = req.params.cmtId
    Comment.update({_id: id},req.body)
    .exec()
    .then(result=>{
        res.status(200).json({
            message: "Post Updated"
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}
module.exports.deleteCmts = (req, res)=>{
    const id = req.params.cmtId
    Comment.remove({_id: id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message: "Transaction deleted"
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error : err
        })
    })
}