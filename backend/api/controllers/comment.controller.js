const Comment = require('../models/comment.model');

module.exports.getAll = async (req, res)=>{
    try {
        const docs = await Comment.find()
        res.status(200).json(docs)
    } catch(err){
        res.status(500).json({"Message": err.message})
    }
}

module.exports.createCmts = async (req, res)=>{
    try {
        const comment = new Comment({
            idUser: req.body.userId,
            comment: req.body.comment,
        })
        await comment.save()
        res.status(200).json({
            message: "Created post successfully"
        })       
    } catch (err){
        res.status(500).json({"Message": err.message})
    }
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