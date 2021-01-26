const Bill = require('../models/bill.model');
const Transaction = require('../models/transaction.model')

module.exports.getAll = async (req, res) => {
    try {
        const docs = await Bill.find()
        res.status(200).json(docs)
    }
    catch (err){
        res.status(500).json({msg: err.message})
    }
}

module.exports.getBill = async (req, res) => {
    try {
        const id = req.params.id
        const docs = await Bill.find({transaction: id})
        res.status(200).json(docs)
    }
    catch (err){
        res.status(500).json({msg: err.message})
    }
}

module.exports.createBill = async (req, res) => {
    try {
        const { price, transactionId, bill_date } = req.body
        const bill = new Bill ({
            price,
            bill_date,
            transaction: transactionId
        })
        await bill.save()

        await Transaction.findByIdAndUpdate({_id: transactionId}, {"$push": { bills: {bill: bill._id}}})

        res.status(200).json({msg: "Bill Created Successfully !"})
    }
    catch(err) {
        res.status(500).json({msg: err.message})
    }
}

module.exports.createCommentBill = async (req, res) => {
    try {
        const id = req.params.id

        console.log(req.body)
        const comment = {
            content: req.body.comment
        }
        await Bill.findByIdAndUpdate((id), {$set : { comment: comment}})

        res.status(200).json({msg: "Bill updated Successfully !"})
    } catch(err){
        res.status(500).json({msg: err.message})
    }
}

module.exports.updateBill = async (req, res) => {
    try {
        const id = req.params.id

        const bill = await Bill.findById(id)

        await Bill.findByIdAndUpdate((id), {$set : { price: req.body, comment: {content: bill.comment.content, isUpdate: true}} })

        res.status(200).json({msg: "Bill updated Successfully !"})
    } catch(err){
        res.status(500).json({msg: err.message}) 
    }
}

module.exports.userPayment = async (req, res) => {
    try {
        const id = req.params.id

        await Bill.findByIdAndUpdate((id), {$set : { isProcessing: true }})

        res.status(200).json({msg: "Bill updated Successfull"})
    }
    catch (err){
        res.status(500).json({msg: err.message}) 
    }    
}

module.exports.confirmPayment = async (req, res) => {
    try {
        const id = req.params.id

        await Bill.findByIdAndUpdate((id), {$set : { isComplete: true }})

        res.status(200).json({msg: "Bill updated Successfull"})
    }
    catch (err){
        res.status(500).json({msg: err.message}) 
    }    
}