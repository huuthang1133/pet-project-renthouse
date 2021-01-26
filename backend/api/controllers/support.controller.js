const Support = require('../models/support.model');
const Transaction = require('../models/transaction.model');
const User = require('../models/user.model')

module.exports.getAll = async (req, res)=>{
    try {
        const docs = await Support.find()
        res.status(200).json(docs)
    } catch(err) {
        res.status(500).json({
            msg : err.message
        })
    }
}

module.exports.getSupport = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(req.user.id)
        const transaction = await Transaction.findById(id)
        if(!user.isAdmin) {
            if(transaction.user !== req.user.id) return res.status(400).json({msg: "required invalid"})   
        }
        const docs = await Support.find({ transaction: id })
        res.status(200).json(docs)
    } catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
}

module.exports.createSupports = async (req, res)=>{
    try {
        const id = req.params.id
        const transaction = await Transaction.findById(id)
        if(transaction.user !== req.user.id) return res.status(400).json({msg: "required invalid"})
        const { content } = req.body 
        const support = new Support({
            transaction: id,
            content
        })
        await support.save()
        res.status(200).json({
            msg: "Created post successfully"
        })        
    } catch(err){
        res.status(500).json({
            msg: err.message
        })
    }
}

module.exports.updateSupports = async (req, res)=>{
    try {
        const id = req.params.id
        await Support.findByIdAndUpdate((id), {$set: {isComplete: true}})
        res.status(200).json({
            message: "Post Updated"
        })
    } catch(err) {
        res.status(500).json({
            msg: err.message 
        })
    }
}
module.exports.deleteSupports = async (req, res)=>{
    try {
        const id = req.params.supportId
        await Support.remove({_id: id})
        res.status(200).json({
            message: "Transaction deleted"
        })        
    } catch(err){
        res.status(500).json({
            error : err
        })
    }
}