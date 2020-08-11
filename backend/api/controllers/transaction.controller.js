const Transaction = require('../models/transaction.model')

module.exports.getAll = (req, res)=>{
    Transaction.find()
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
module.exports.createTrans = (req, res)=>{
    const transaction = new Transaction({
        userId: req.body.userId,
        roomId: req.body.roomId,
        isFinish: false,
        rent_date: req.body.rent_date
    })
    transaction.save()
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

module.exports.updateTrans = (req, res)=>{
    const id = req.params.transactionId
    Transaction.update({_id: id},req.body)
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
module.exports.deleteTrans = (req, res)=>{
    const id = req.params.transactionId
    Transaction.remove({_id: id})
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