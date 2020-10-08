const Transaction = require('../models/transaction.model')
const User = require('../models/user.model')
const Room = require('../models/room.model');

module.exports.getAll = (req, res)=>{
    Transaction.find()
    .exec()
    .then(docs =>{
        // console.log(docs)
        res.status(200).json(docs)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
}

module.exports.getTrans = (req, res) => {
    const id = req.params.userId
    console.log(req.params)
    Transaction.find({ userId: id })
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


module.exports.createTrans = async (req, res)=>{
    let day = new Date();
    const user = await User.find({username: req.body.username})
    let userId = user[0]._id
    const transaction = new Transaction({
        userId: userId,
        room: req.body.room,
        isFinish: false,
        rent_date: day
    })
    transaction.save()
    .then(result =>{
        res.status(200).json(transaction)
        console.log(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
    Room.updateOne({_id: req.body.room._id}, {
        isVacancy: false
    })
    .exec()   
}

module.exports.updateTrans = async(req, res)=>{
    const id = req.params.transactionId
    if(req.body.content){
        let billUp = req.body.bill
        let content = req.body.content
        let transaction = await Transaction.findById(id)
        const index = transaction.bills.findIndex((bill)=>{
            return bill._id == billUp._id
        })
        transaction.bills[index].comment = { content }
        Transaction.update({_id:id}, transaction, function(doc,err){
        })      
    }
    if(req.body.price && req.body.bill_date){
        let price = req.body.price
        let bill_date = req.body.bill_date
        let transaction = await Transaction.findById(id)
        console.log(transaction)
        transaction.bills = transaction.bills.push({
            price,
            isComplete: false,
            bill_date
        })
        console.log(transaction, transaction.bills)    
        Transaction.update({_id: id}, transaction, function(doc, err){})
        res.json(transaction)
    }
}

module.exports.updateBill = async (req, res) => {
    const id = req.params.transactionId
    let { billId, content, electric, water } = req.body
    let transaction = await Transaction.findById(id)
    const index = transaction.bills.findIndex((bill)=>{
        return bill._id == billId
    })
    if(electric){
        transaction.bills[index].price.electric = electric
    }
    else if(water){
        transaction.bills[index].price.water = water       
    }    
    else if(content){
        transaction.bills[index].comment.push({content})       
    }
    else {
        transaction.bills[index].isComplete = !transaction.bills[index].isComplete
        
    }
    Transaction.update({_id:id}, transaction, function(doc,err){
    }) 
    res.json(transaction)
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