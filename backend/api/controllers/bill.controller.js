const Bill = require('../models/bill.model');

module.exports.getAll = (req, res)=>{
    Bill.find()
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

module.exports.createBills = (req, res)=>{
    const bill = new Bill({
        name: req.body.name,
        price: req.body.price,
        isComplete: false,
        transactionId: req.body.transactionId,
        bill_date: req.body.bill_date,
        idComment: req.body.idComment
    })
    bill.save()
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

module.exports.updateBills = (req, res)=>{
    const id = req.params.billId
    Bill.update({_id: id},req.body)
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
module.exports.deleteBills = (req, res)=>{
    const id = req.params.billId
    Bill.remove({_id: id})
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