const Room = require('../models/room.model');



class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query
 
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))
        
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        const convertObj = (Obj) => {
            if(Obj.isVacancy === "true") return {...Obj, isVacancy: true}
            if(Obj.isVancaycy === "false") return {...Obj, isVacancy: false}
            return {...Obj}
        }
        const newObj = convertObj(JSON.parse(queryStr))
        this.query.find(newObj)
          
        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

module.exports.getAll = async (req, res) => {
    try {
        const features = new APIfeatures(Room.find(), req.query).filtering().sorting().paginating()
        const docs = await features.query
        res.status(200).json({rooms: docs, result: docs.length})
    } catch(err){
        return res.status(500).json({
            msg : err.message
        })
    }
}

module.exports.createRooms = async (req, res) =>{
    try {
        const { name, price } = req.body
        const room = new Room({
            name, price
        })
        await room.save()
        res.status(200).json({
            message: "Created post successfully"
        })            
    } catch(err){
        res.status(500).json({
            msg: err.message
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

