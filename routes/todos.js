var express = require('express');
var router = express.Router();
var todoController = require('../controllers/todosController')
const Authorization = require('../middlewares/authorization')
const Authentication = require('../middlewares/authentication')

/* GET todos listing. */
router.get('/:userId', todoController.getTodo);
router.post('/:userId/add', todoController.addTodo);
router.delete('/delete', todoController.deleteTodo);
router.put('/updateDone', todoController.updateDone);
router.put('/updateNot', todoController.updateNot);

module.exports = router;
