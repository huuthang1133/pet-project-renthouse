const Transaction = require('../models/transaction.model')
const User = require('../models/user.model')
const Room = require('../models/room.model');

module.exports.getAll = async (req, res)=>{
    try {
        const docs = await Transaction.find()
        res.status(200).json(docs)
    } catch(err) {
        res.status(500).json({
            msg : err.message
        })
    }
}

module.exports.getTrans = async (req, res) => {
    try {
        const id = req.params.userId
        const docs = await Transaction.find({ userId: id })
        res.status(200).json(docs)
    } catch (err) {
        res.status(500).json({
            "Message" : err.message
        })       
    }
}


module.exports.createTrans = async (req, res)=>{
    try {
        const day = new Date();
        const user = await User.find({username: req.body.username})
        const userId = user[0]._id
        const transaction = new Transaction({
            userId: userId,
            room: req.body.room,
            isFinish: false,
            rent_date: day
        })
        await transaction.save()
        await Room.updateOne({_id: req.body.room._id}, {
            isVacancy: false
        })
        
        res.status(200).json({msg: "Transaction Created", docs})
    } catch (err){
        res.status(500).json({"Message": err.message})
    }
}

module.exports.updateTrans = async (req, res)=>{
    try {
        const id = req.params.transactionId
        const { content, price, bill_date } = req.body 
        if(content){
            const billUp = req.body.bill
            let transaction = await Transaction.findById(id)
            const index = transaction.bills.findIndex((bill)=>{
                return bill._id == billUp._id
            })
            transaction.bills[index].comment = { content }
            await Transaction.updateOne({_id:id}, transaction, function(doc,err){
            })      
        }
        if(price && bill_date){
            let transaction = await Transaction.findById(id)
            transaction.bills = transaction.bills.push({
                price,
                isComplete: false,
                bill_date
            })   
            await Transaction.updateOne({_id: id}, transaction, function(doc, err){})
            res.status(200).json({msg: "Transactions Updated"})
        }
    } catch(err) {
        res.status(500).json({msg: err.message})
    }
}

module.exports.updateBill = async (req, res) => {
    try {
        const id = req.params.transactionId
        const { billId, content, electric, water } = req.body
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
        res.status(200).json({"Message": "Transaction Updated"})
    } catch(err){
        res.status(500).json({"Message": err.message})
    }

}


module.exports.deleteTrans = async (req, res)=>{
    try {
        const id = req.params.transactionId
        await Transaction.remove({_id: id})
        res.status(200).json({
            message: "Transaction deleted"
        })
    } catch(err){
        res.status(500).json({
            "Message" : err.message
        })
    }
}