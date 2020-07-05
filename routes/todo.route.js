const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo.controller')

router.get('/fetch/all', todoController.getAllTodos)
router.post('/new', todoController.createTodo)
router.post('/toggle', todoController.toggleTodo)
router.post('/delete', todoController.deleteTodo)
router.post('/note/add', todoController.addNote)

module.exports = router