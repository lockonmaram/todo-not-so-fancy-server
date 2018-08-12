const jwt = require('jsonwebtoken')
require('dotenv').config()

class Authorization {
  static authorizationAdmin (req, res, next){
    jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY, function(err,decoded){
      console.log(decoded);
      if (decoded === undefined) {
        res.status(400).json('invalid token')
      }else if (decoded.role =='user') {
        res.status(401).json('user is not authorized')
      }else if (decoded.role == 'admin'){
        next()
      }
    })
  }
  static authorizationUserAdmin (req, res, next){
    jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY, function(err,decoded){
      console.log(decoded);
      if (decoded === undefined) {
        res.status(400).json('invalid token')
      }else if (decoded.role =='user') {
        next()
      }else if (decoded.role == 'admin'){
        next()
      }
    })
  }
}

module.exports = Authorization
