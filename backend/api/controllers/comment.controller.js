const Comment = require('../models/comment.model');
const Bill = require('../models/bill.model');

module.exports.getAll = async (req, res)=>{
    try {
        const docs = await Comment.find()
        res.status(200).json(docs)
    } catch(err){
        res.status(500).json({msg: err.message})
    }
}

module.exports.createCmts = async (req, res)=>{
    try {
        const comment = new Comment({
            userId: req.user.id,
            comment: req.body.comment,
        })
        await comment.save()

        await Bill.findByIdAndUpdate({_id: req.body.billId}, { comment: comment._id})

        res.status(200).json({
            message: "Created comment successfully"
        })

    } catch (err){
        res.status(500).json({msg: err.message})
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