const jwt = require('jsonwebtoken')
require('dotenv').config()

class Authentication {
  static authenticationRead(req, res, next){
    jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY, function(err,decoded){
      console.log(decoded.id);
      console.log(req.params.id);
      if (decoded === undefined) {
        res.status(400).json('invalid token')
      }else if (decoded.id == req.params.id){
        next()
      }else if (decoded.role == 'admin') {
        next()
      }else {
        res.status(401).json('user is not authorized')
      }
    })
  }
}

module.exports = Authentication
