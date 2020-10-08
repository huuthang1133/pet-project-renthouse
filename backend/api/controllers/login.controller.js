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
  console.log(req.body)
  var user = await User.find({username: username, password: password});
  console.log(user)
  if(user.length){
    if(user[0].password  === password) {
      const accessToken = jwt.sign(username, 'iabsgasfgbasfg')
      res.json(
        {
          user: {
            userId: user[0]._id,
            isAdmin: user[0].isAdmin,
            fullName: user[0].fullName,
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
  // if(users.length){
  //   const user = { username };
  //   const accessToken = jwt.sign(user, 'iabsgasfgbasfg');
  //   res.json({users, accessToken});
  // } 
  // else { res.json(false) } 
}