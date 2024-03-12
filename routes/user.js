var express = require('express');
var router = express.Router();
var userHandler = require('../service/userHandler');


// login
router.post('/login', userHandler.login);
 
// register
router.post('/register', userHandler.register);

// Fetch user account information 
router.get('/query/:email', userHandler.query);
// 

// Update user account information
router.put('/update', userHandler.update);

// logout
router.get('/logout', userHandler.logout);


module.exports = router;