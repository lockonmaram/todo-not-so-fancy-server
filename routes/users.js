var express = require('express');
var router = express.Router();
var userController = require('../controllers/usersController')
const Authorization = require('../middlewares/authorization')
const Authentication = require('../middlewares/authentication')

/* GET home page. */
router.get('/', Authorization.authorizationAdmin, userController.getUsers);
router.get('/:id', Authentication.authenticationRead, Authorization.authorizationUserAdmin, userController.getOneUser);
router.post('/', Authorization.authorizationAdmin, userController.registerUser);
router.delete('/:id', Authentication.authenticationRead, Authorization.authorizationAdmin, userController.deleteUser);
router.put('/:id', Authorization.authorizationUserAdmin, userController.updateUser);


module.exports = router;
