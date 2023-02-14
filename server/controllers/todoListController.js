const Todo = require('../models/TodoSchema');

const todoListController = {};

todoListController.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();

    res.locals.todos = todos;
    return next();
  } 
  catch (err) {
    return next({
        log: 'Error in middleware todoListController.getTodos',
        status: 500,
        message: `Error: ${err}`,
      })
  }    
}

todoListController.postTodo = async (req, res, next) => {
    try {
      const todo = new Todo({
        text: req.body.text
      });

      todo.save();
      res.locals.todo = todo;
      return next();
    } 
    catch (err) {
      return next({
          log: 'Error in middleware todoListController.postTodo',
          status: 500,
          message: `Error: ${err}`,
        })
    }    
}

todoListController.delete = async (req, res, next) => {
    try {
      const result = await Todo.findByIdAndDelete(req.params.id)
      console.log(result);
      return next();
    } 
    catch (err) {
      return next({
          log: 'Error in middleware todoListController.delete',
          status: 500,
          message: `Error: ${err}`,
        })
    }    
}

todoListController.complete = async (req, res, next) => {
    try {
      const todo = await Todo.findById(req.params.id)
      
      todo.complete = !todo.complete;
      todo.save();

      res.locals.updatedTodo = todo;
      return next();
    } 
    catch (err) {
      return next({
          log: 'Error in middleware todoListController.delete',
          status: 500,
          message: `Error: ${err}`,
        })
    }    
}

module.exports = todoListController;