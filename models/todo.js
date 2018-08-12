var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  task: {
    type: String,
    require: true
  },
  priority: {
    type: String,
    require: true
  },
  done: {
    type: String,
    default: 'false'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo
