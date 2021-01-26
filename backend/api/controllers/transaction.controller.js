const Transaction = require('../models/transaction.model')
const User = require('../models/user.model')
const Room = require('../models/room.model');

module.exports.getAll = async (req, res)=>{
    try {
        const docs = await Transaction.find()
        .populate('user')
        .populate('room')
        .populate('bills.bill')

        res.status(200).json(docs)
    } catch(err) {
        res.status(500).json({
            msg : err.message
        })
    }
}

module.exports.getTrans = async (req, res) => {
    try {
        const id = req.user.id
        const docs = await Transaction.find({ user: id})
        .populate('user')
        .populate('room')
        .populate('bills.bill')
        res.status(200).json(docs)
    } catch (err) {
        res.status(500).json({
            msg : err.message
        })       
    }
}


module.exports.createTrans = async (req, res)=>{
    try {
        const user = req.user.id
        const { id } = req.body
        const transaction = new Transaction({
            user,
            room: id
        })
        await transaction.save()
        await Room.findOneAndUpdate( {_id: id}, {
            isVacancy: false
        })
        
        res.status(200).json({msg: "Transaction Created", transaction})
    } catch (err){
        res.status(500).json({msg: err.message})
    }
}



