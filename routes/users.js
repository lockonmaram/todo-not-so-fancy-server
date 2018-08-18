var express = require('express');
var router = express.Router();
var userController = require('../controllers/usersController')
const Authorization = require('../middlewares/authorization')
const Authentication = require('../middlewares/authentication')

/* GET home page. */
router.get('/', userController.getUsers);
router.get('/:id', userController.getOneUser);
router.post('/', userController.registerUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);


module.exports = router;
