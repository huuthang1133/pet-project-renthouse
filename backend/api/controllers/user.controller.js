const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.getAll = async (req, res)=>{
    try {
        const docs = await User.find()
        res.status(200).json(docs)
    } catch (err){
        res.status(500).json({Message: err.message})
    }
}

module.exports.createUser = async (req, res) =>{
    try {
        const { username, password, fullName } = req.body
        const user = await User.findOne({username})
        if(user) return res.status(400).json({msg: "The username already exists"})
        if(password.length < 6) return res.status(400).json({msg: "Password is at least 6 characters"})
        // Password Encryption
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            password: passwordHash,
            fullName: fullName.toLowerCase()
        })
        await newUser.save()

    
        const refreshtoken = createRefreshToken({id: newUser._id})

        res.status(200).json(refreshtoken)

    } catch(err){
        res.status(500).json({msg : err.message})
    }
}


module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({username})
        if(!user) return res.status(400).json({msg: "User doesn't exist"})
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({msg: "Password is incorrect"})
    
        const refreshtoken = createRefreshToken({id: user._id})
             
        res.json(refreshtoken)

    } catch(err){
        res.status(500).json({msg: err.message})
    }
}

module.exports.refreshToken = async (req, res) => {
    try {
        const rf_token = req.body.rf_token
        if(!rf_token) return res.status(400).json({msg: 'Please login or register !'})
        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: 'Please login or register !'})
            const accesstoken = createAccessToken({id: user.id})
            res.json({accesstoken})
        })
    }
    catch(err){
        return res.status(500).json({msg: err.message})
    }
}

module.exports.logout = async (req, res) => {
    try {
        return res.json({ msg: "Logged out"})
    } catch (err){
        return res.status(500).json({msg: err.message})
    }
}

module.exports.getUser = async (req, res) =>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        if(!user) return res.status(400).json({msg: "User does not exist."})

        res.json(user)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}



const createAccessToken = user => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
}

const createRefreshToken = user => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})
}