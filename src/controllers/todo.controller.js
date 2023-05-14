const controllers = {}
const models = require('../models/todo.model')
const activity = require('../models/activity.model')
const response = require('../helpers/response')
const {StatusCodes} = require('http-status-codes')

controllers.getAllTodo = async (req, res) => {
    try {
        const { activity_group_id } = req.query
        const data = await models.getAllTodo(+activity_group_id)
        response(res, StatusCodes.OK, data)
    } catch (error) {
        console.log(new Error(error).message)
        response(res, StatusCodes.BAD_REQUEST, error)
    }
}

controllers.getTodoByID = async (req, res) => {
    try {
        const { id } = req.params
        const data = await models.getTodoByID(+id)
        response(res, StatusCodes.OK, data)
    } catch (error) {
        console.log(new Error(error).message)
        response(res, StatusCodes.BAD_REQUEST, error)
    }
}

controllers.addTodo = async (req, res) => {
    try {
        const { title, activity_group_id, is_active, priority } = req.body
        const myPriority = priority ? priority : "very-high"
        const getActivity = await activity.getActivityByID(+activity_group_id)
        if (getActivity.length === 0) throw new Error("data not found")
        const todoId = await models.addTodo({ title, activity_group_id, is_active, priority:myPriority })
        const data = await models.getTodoByID(todoId)
        response(res, StatusCodes.CREATED, data)
    } catch (error) {
        console.log(new Error(error).message)
        response(res, StatusCodes.BAD_REQUEST, new Error(error).message)
    }
}

controllers.updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { title, is_active, priority } = req.body
        await models.updateTodo({ title, is_active, priority, id })
        const data = await models.getTodoByID(+id)
        response(res, StatusCodes.OK, data)
    } catch (error) {
        console.log(new Error(error).message)
        response(res, StatusCodes.BAD_REQUEST, new Error(error).message)
    }
}

controllers.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        await models.deleteTodo(+id)
        response(res, StatusCodes.OK, `activity with id ${id} successfuly deleted`)
    } catch (error) {
        console.log(new Error(error).message)
        response(res, StatusCodes.BAD_REQUEST, new Error(error).message)
    }
}

module.exports = controllers