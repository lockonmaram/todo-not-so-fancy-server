const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var FB = require('fb')

class UserController {
  static registerUser(req, res){
    // console.log(req.body);
    if (req.body.password === undefined || req.body.password.length === 0) {
      res.status(400).json({message: 'password is required'})
    }
    const saltUser = bcrypt.genSaltSync(8)
    const hashedPassword = bcrypt.hashSync(req.body.password, saltUser)
    User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword
    })
    .then(user=>{
      res.status(200).json({message: 'user successfully registered!'})
    })
    .catch(err=>{
      res.status(400).json({message: 'something went wrong!', err})
    })
  }
  static getUsers(req, res){
    User.find({})
    .then(users=>{
      // console.log(users);
      if (users.length === 0) {
        res.status(404).json({message: 'no users found!',data: users})
      }else {
        res.status(200).json({message: 'users found!',data: users})
      }
    })
    .catch(err=>{
      res.status(400).json({message: 'something went wrong!', err})
    })
  }
  static getOneUser(req, res){
    User.findOne({ _id: req.params.id })
    .then(user=>{
      // console.log(user);
      res.status(200).json({message: 'User successfully retrived',data: user})
    })
    .catch(err=>{
      res.status(400).json({message: 'something went wrong!', err})
    })
  }
  static deleteUser(req, res){
    User.deleteOne({ _id: req.params.id })
    .then(result=>{
      res.status(200).json({message: 'user successfully deleted', data: result})
    })
    .catch(err=>{
      res.status(400).json({message: 'something went wrong!', err})
    })
  }
  static updateUser(req, res){
    if (req.body.password === undefined || req.body.password.length === 0) {
      res.status(400).json({message: 'password is required to update'})
    }
    const saltUser = bcrypt.genSaltSync(8)
    const hashedPassword = bcrypt.hashSync(req.body.password, saltUser)
    User.updateOne({ _id: req.params.id }, {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    .then(result=>{
      res.status(200).json({message: 'user successfully updated!', result})
    })
    .catch(err=>{
      res.status(400).json({message: 'something went wrong!', err})
    })
  }
  static login(req, res){
    console.log(req.body);
    User.findOne({ email: req.body.email})
    .then(user => {
      const passwordCheck = bcrypt.compareSync(req.body.password, user.password)
      console.log(user.password);
      console.log(passwordCheck);
      if (passwordCheck) {
        const tokenUser = jwt.sign({
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        }, process.env.JWT_SECRET_KEY)
        // console.log(tokenUser);
        res.status(200).json({token: tokenUser, userId: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email })
        // req.headers.token = tokenUser
      }else {
        res.status(400).json({message: 'wrong password'})
      }
    })
    .catch(err=>{
      res.status(400).json({message: 'email is not found'})
    })
  }
  static fbLogin(req, res){
    FB.api('me', { fields: ['id', 'first_name', 'last_name', 'email'], access_token: `${req.headers.token}` }, function (resFb) {
      console.log('resfb------>',resFb);
      User.findOne({ email: resFb.email })
      .then(regist=>{
        // console.log(regist);
        if (regist === null) {
          const saltUser = bcrypt.genSaltSync(8)
          const hashedPassword = bcrypt.hashSync(`${resFb.first_name.toLowerCase()}123`, saltUser)
          User.create({
            first_name: resFb.first_name,
            last_name: resFb.last_name,
            email: resFb.email,
            password: hashedPassword
          })
          .then(user=>{
            // console.log('ini promise', user);
            const tokenUser = jwt.sign({
              id: user._id,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name
            }, process.env.JWT_SECRET_KEY)
            // console.log(tokenUser);
            let data = {
              token: tokenUser, userId: user._id,
              first_name: user.first_name, last_name: user.last_name,
              email: user.email
            }
            res.status(200).json({message: "fb login successful!", data})
          })
          .catch(err=>{
            res.status(400).json({message: 'email is not found', err})
          })
        }else if(regist.email === resFb.email){
          const tokenUser = jwt.sign({
            id: regist._id,
            email: regist.email,
            first_name: regist.first_name,
            last_name: regist.last_name
          }, process.env.JWT_SECRET_KEY)
          console.log(regist);
          // console.log('tokenasdasd',tokenUser);
          let data = { token: tokenUser, userId: regist._id, email: regist.email, first_name: regist.first_name, last_name: regist.last_name }
          res.status(200).json({message: "fb login successful!", data})
          // req.headers.token = tokenUser
        }
      })
    });
  }
}

module.exports = UserController
