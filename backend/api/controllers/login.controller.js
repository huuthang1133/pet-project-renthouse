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
  var users = await User.find({username: username, password: password});
  if(users.length){
    const user = { username };
    const accessToken = jwt.sign(user, 'iabsgasfgbasfg');
    res.json({accessToken});
  } 
  else { res.json(false) } 
}