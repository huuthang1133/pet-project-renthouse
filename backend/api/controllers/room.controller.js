const Room = require('../models/room.model');

module.exports.getAll = async (req, res) => {
    try {
        const docs = await Room.find()
        res.status(200).json(docs)
    } catch(err){
        return res.status(500).json({
            msg : err.message
        })
    }
}

module.exports.createRooms = async (req, res) =>{
    try { 
        const room = new Room({
            isVacancy: true,
        })
        await room.save()
        res.status(200).json({
            message: "Created post successfully"
        })            
    } catch(err){
        res.status(500).json({
            "Message": err.message
        })
    }
}

module.exports.updateRooms = async (req, res) => {
    try {
        const id = req.params.roomId
        await Room.updateOne({_id: id},req.body)
        res.status(200).json({
            message: "Post Updated"
        })        
    } catch (err) {
        res.status(500).json({
            "Message": err.message
        })
    }
}
