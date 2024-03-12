const createError = require('http-errors');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const jwtUtil = require('./util/jwtUtil');
const blacklist = require('./util/blackListUtil');
const login_link = 'http://localhost:3000/api/users/login';

var app = express();

// log
app.use(logger('dev'));
// resolution the json data in requests
app.use(express.json());
app.use(bodyParser.json());
// resolution the data with UTF format in requests
app.use(express.urlencoded({ extended: true }));
// resolution the cookies in HTTP requests
app.use(cookieParser());

// import routes
const indexRouter = require('./routes/index.js');
const userRouter = require('./routes/user.js');

// Authorization 
app.use(jwtUtil.expressJwt.unless({ path: ['/', '/api/users/login', '/api/users/register'] }));

// Authorization blacklist
app.use((req, res, next) => {
  auth = req.headers.authorization
  console.log(auth)
  console.log(blacklist.jwtBlacklist)
  console.log(blacklist.isInBlacklist(auth))
  if (!blacklist.isInBlacklist(auth)){
    next();
  }else{
    console.log('Authorization is in blacklist!');
    res.send({'status': 403, 'msg': 'Authorization fail, please login: ' + login_link});
  }
});


// error handler
app.use((err, req, res, next) => {
  console.log(err)
  // Check if it is an HTTP error object, if not, convert it to a 500 error
  if (!createError.isHttpError(err)) {
      err = createError(500, 'Internal Server Error');
  }
  res.status(err.status).send(err.message);
});

app.use('/', indexRouter);
app.use('/api/users/', userRouter);



// listen the port
const port = 3000;
app.listen(port, () => {
  console.log(`service is running on http://localhost:${port}`);
});