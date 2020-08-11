const User = require('../models/user.model')

module.exports.getAll = (req, res)=>{
    User.find()
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
module.exports.createUser = (req, res)=>{
    const user = new User({
        username: req.body.username,
        passpord: req.body.passpord,
        fullName: req.body.fullName
    })
    user.save()
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