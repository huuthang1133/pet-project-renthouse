const User = require('../models/user.model');

const jwt = require('jsonwebtoken');

module.exports.index = async function(req, res){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  jwt.verify(token, 'iabsgasfgbasfg', (err, user) => {
    if(err) return res.sendStatus(401)
    res.json(user)
  })
}

module.exports.postLogin = async function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var user = await User.findOne({username});
  if(user){
    if(user.password  === password) {
      const accessToken = jwt.sign(username, 'iabsgasfgbasfg')
      res.json(
        {
          user: {
            userId: user._id,
            isAdmin: user.isAdmin,
            fullName: user.fullName,
            username            
          },
          accessToken, 
          message: "Login Success"
        }
      )
    }
    else {
      res.json({message: "Wrong Password!"})
    }
  }
  else {
    res.json({message: "User doesn't exist"})
  }  
}