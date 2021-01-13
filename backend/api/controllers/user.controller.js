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
        if(user) return res.status(200).json({message: "The username already exists"})
        if(password.length < 6) return res.status(200).json({message: "Password is at least 6 characters"})
        // Password Encryption
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            password: passwordHash,
            fullName,
        })
        await newUser.save()


        const accesstoken = createAccessToken({id: newUser._id })
    
        const refreshtoken = createRefreshToken({id: newUser._id})

        res.status(200).json({
            user: {
            userId: newUser._id,
            isAdmin: newUser.isAdmin,
            fullName: newUser.fullName,
            username            
            },
            accesstoken,
            message: "Created User successfully"
        })             
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token'
        })                     
    } catch(err){
        res.status(500).json({Message : err.message})
    }
}


module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({username})
        if(!user) return res.status(200).json({message: "User doesn't exist"})
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(200).json({message: "Password is incorrect"})
    
        const accesstoken = createAccessToken({id: user._id})
        const refreshtoken = createRefreshToken({id: user._id})
    
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token'
        })            
        res.json({
            user: {
              userId: user._id,
              isAdmin: user.isAdmin,
              fullName: user.fullName,
              username            
            },
            accesstoken, 
            message: "Login Success"
          })

    } catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.refreshToken = async (req, res) => {
    try {
        const rf_token = req.cookies.refreshtoken
        if(!rf_token) return res.status(400).json({msg: 'Please login or register !'})
        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: 'Please login or register !'})
            const accesstoken = createAccessToken({id: user.id})
            res.json({accesstoken})
        })
        // res.json({rf_token})
    }
    catch(err){
        return res.status(500).json({msg: err.message})
    }
}

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
        return res.json({ msg: "Logged out"})
    } catch (err){
        return res.status(500).json({msg: err.message})
    }
}



const createAccessToken = user => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
}

const createRefreshToken = user => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})
}