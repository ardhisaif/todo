const express = require('express')
const router = express.Router()
const controller = require('../controllers/todo.controller')

router.get('/', controller.getAllTodo)
router.post('/', controller.addTodo)
router.get('/:id', controller.getTodoByID)
router.patch('/:id', controller.updateTodo)
router.delete('/:id', controller.deleteTodo)

module.exports = router