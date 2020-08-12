const User = require('../models/user.model');

module.exports.createUser = (req, res)=>{
    const user = new User({
        username: req.body.username,
        password: req.body.passpord,
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