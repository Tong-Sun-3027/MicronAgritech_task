var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

const jwtSecretKey = 'Micron';

createToken = (email) => {
  return 'Bearer ' + jwt.sign({email: email}, jwtSecretKey, { expiresIn: 300 });
};

module.exports = {
  createToken: createToken,
  jwtSecretKey: jwtSecretKey,
  expressJwt:expressJwt.expressjwt({ secret: jwtSecretKey , algorithms: ['HS256'] }),
  UnauthorizedError: expressJwt.UnauthorizedError
};