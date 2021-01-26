const Users = require('../models/user.model')
const Transaction = require('../models/transaction.model')

const authSupport = async (req, res, next) => {
    try {
        const id = req.user.id
        const transaction = await Transaction.find({ user: id})
        req.transaction = transaction
        next(transaction)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

module.exports = authSupport