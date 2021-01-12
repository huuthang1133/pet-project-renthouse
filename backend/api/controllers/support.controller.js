const Support = require('../models/support.model');

module.exports.getAll = async (req, res)=>{
    try {
        const docs = await Support.find()
        res.status(200).json(docs)
    } catch(err) {
        res.status(500).json({
            "Message" : err.message
        })
    }
}

module.exports.createSupports = async (req, res)=>{
    try {
        const { transactionId, content } = req.body 
        const support = new Support({
            transactionId,
            content
        })
        await support.save()
        res.status(200).json({
            message: "Created post successfully"
        })        
    } catch(err){
        res.status(500).json({
            "Message": err.message
        })
    }
}

module.exports.updateSupports = async (req, res)=>{
    try {
        const id = req.params.supportId
        await Support.updateOne({_id: id},req.body)
        res.status(200).json({
            message: "Post Updated"
        })
    } catch(err) {
        res.status(500).json({
            error: err
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