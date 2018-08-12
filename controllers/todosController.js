const Todo = require('../models/todo')

class TodoController {
  static getTodo(req, res){
    Todo.find({ userId: req.params.id })
    .then(todos=>{
      // console.log(todos);
      res.status(200).json(todos)
    })
    .catch(err=>{
      res.status(400),json('error')
    })
  }
  static addTodo(req, res){
    Todo.create({
      task: req.body.task,
      priority: req.body.priority,
      userId: req.params.id
    })
    .then(todo=>{
      res.status(200).json(todo)
    })
    .catch(err=>{
      res.status(400),json('error')
    })
  }
  static updateDone(req, res){
    // console.log(req.body.todoId);
    Todo.updateOne({ _id: req.body.todoId },{
      done: 'true'
    })
    .then(done=>{
      res.status(200).json(done)
    })
    .catch(err=>{
      res.status(400).json('error')
    })
  }
  static updateNot(req, res){
    // console.log(req.body.todoId);
    Todo.updateOne({ _id: req.body.todoId },{
      done: 'false'
    })
    .then(done=>{
      res.status(200).json(done)
    })
    .catch(err=>{
      res.status(400).json('error')
    })
  }
  static deleteTodo(req, res){
    console.log(req.body.todoId);
    Todo.deleteOne({ _id: req.body.todoId })
    .then(result=>{
      res.status(200).json('task successfully deleted')
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
}

module.exports = TodoController
