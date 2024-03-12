
var express = require('express');           // import express
var router = express.Router();              //create a Router object
var jwtUtil = require('../util/jwtUtil');
var jwt = require('jsonwebtoken');

const login_link = 'http://localhost:3000/api/users/login';


// jwt authorization
isAuthenticated =  (req, res, next) => {
  auth = req.headers.authorization
  // user has not log in, then forward to the login page
  if (typeof auth === 'undefined') {
    res.send('you haven\'t login, please login: ' + login_link);
    
  }else{ 
    const token = auth.split(' ')[1];
    jwt.verify(token, jwtUtil.jwtSecretKey, (err, decoded) => { // vertify the token
      if (err){
        console.log('Token vertify fail by JWT!')
        res.send({'status': 403, 'msg': 'Authorization fail, please login: ' + login_link});
      }
      next();
    })
  } 
}

// index page
router.get('/', isAuthenticated, (req, res) => {
  res.send({'status': 200, 'msg': 'Home Page: You have logged in!'});
});


module.exports = router;