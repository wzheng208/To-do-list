const express = require('express');
const router = express.Router();
const todoListController = require('../controllers/todoListController');


router.get('/todos', todoListController.getTodos, (req, res) => {
    res.status(200).json(res.locals.todos);
})

router.post('/todo/new', todoListController.postTodo, (req, res) => {
    res.status(201).json(res.locals.todo);
})

router.delete('/todo/delete/:id', todoListController.delete, (req, res) => {
    res.status(200).json(res.locals.result);
})

router.get('/todo/complete/:id', todoListController.complete, (req, res) => {
    res.status(200).json(res.locals.todo);
})

module.exports = router;