const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var FB = require('fb')

class UserController {
  static registerUser(req, res){
    const saltUser = bcrypt.genSaltSync(8)
    const hashedPassword = bcrypt.hashSync(req.body.password, saltUser)
    User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      salt: saltUser
    }, function(err, user){
      if (!err){
        const tokenUser = jwt.sign({
          id: user._id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role
        }, process.env.JWT_SECRET_KEY)
        console.log(tokenUser);
        res.status(200).json({token: tokenUser, userId: user._id, first_name: user.first_name, last_name: user.last_name, role: user.role })
      }
    })
  }
  static getUsers(req, res){
    User.find({})
    .then(users=>{
      res.status(200).json(users)
    })
    .catch(err=>{
      res.status(400),json('error')
    })
  }
  static login(req, res){
    User.findOne({ email: req.body.email})
    .then(user => {
      const passwordCheck = bcrypt.compareSync(req.body.password, user.password)
      console.log(user.password);
      console.log(passwordCheck);
      if (passwordCheck) {
        const tokenUser = jwt.sign({
          id: user._id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role
        }, process.env.JWT_SECRET_KEY)
        console.log(tokenUser);
        res.status(200).json({token: tokenUser, userId: user._id, first_name: user.first_name, last_name: user.last_name, role: user.role })
        // req.headers.token = tokenUser
      }else {
        res.status(400).json('wrong password')
      }
    })
    .catch(err=>{
      res.status(400).json('email is not found')
    })
  }
  static fbLogin(req, res){
    FB.api('me', { fields: ['id', 'name', 'email', 'first_name', 'last_name'], access_token: `${req.body.token}` }, function (resFb) {
      console.log('resfb------>',resFb);
      User.find({ email: resFb.email }, function (err, regist) {
        // console.log(regist);
        if (regist[0].email !== resFb.email) {
          const saltUser = bcrypt.genSaltSync(8)
          const hashedPassword = bcrypt.hashSync(`${resFb.first_name}123`, saltUser)
          User.create({
            first_name: resFb.first_name,
            last_name: resFb.last_name,
            email: resFb.email,
            password: hashedPassword,
            salt: saltUser
          }, function(err, user){
            if (!err){
              const tokenUser = jwt.sign({
                id: user._id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
              }, process.env.JWT_SECRET_KEY)
              console.log(tokenUser);
              res.status(200).json({token: tokenUser, userId: user._id, first_name: user.first_name, last_name: user.last_name })
            }
          })
        }else if(regist[0].email === resFb.email){
          const tokenUser = jwt.sign({
            id: regist[0]._id,
            email: regist[0].email,
            first_name: regist[0].first_name,
            last_name: regist[0].last_name
          }, process.env.JWT_SECRET_KEY)
          console.log(regist);
          console.log('tokenasdasd',tokenUser);
          res.status(200).json({token: tokenUser, userId: regist[0]._id, first_name: regist[0].first_name, last_name: regist[0].last_name })
          // req.headers.token = tokenUser
        }
      });
    });
  }
  static deleteUser(req, res){
    User.deleteOne({ _id: req.params.id })
    .then(result=>{
      res.status(200).json('user successfully deleted')
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static updateUser(req, res){
    User.updateOne({ _id: req.params.id }, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      role: req.body.role
    })
    .then(result=>{
      res.status(200).json('user successfully updated')
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static getOneUser(req, res){
    User.findOne({ _id: req.params.id })
    .then(user=>{
      res.status(200).json({msg: 'User successfully retrived',data: user})
    })
    .catch(err=>{
      res.status(400).json('error')
    })
  }
}

module.exports = UserController
