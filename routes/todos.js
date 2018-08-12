var express = require('express');
var router = express.Router();
var todoController = require('../controllers/todosController')
const Authorization = require('../middlewares/authorization')
const Authentication = require('../middlewares/authentication')

/* GET todos listing. */
router.post('/:userId', Authentication.authenticationRead, todoController.getTodo);
router.post('/:userId/add', Authentication.authenticationRead, todoController.addTodo);
router.delete('/delete', Authentication.authenticationRead, todoController.deleteTodo);
router.put('/updateDone', Authentication.authenticationRead, todoController.updateDone);
router.put('/updateNot', Authentication.authenticationRead, todoController.updateNot);

module.exports = router;
