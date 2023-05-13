const controllers = {}
const models = require('../models/activity.model')
const response = require('../helpers/response')
const {StatusCodes} = require('http-status-codes')

controllers.getAllActivity = async (req, res) => {
    try {
        const data = await models.getAllActivity()
        response(res, StatusCodes.OK, data)
    } catch (error) {
        console.log(new Error(error).message)
        response(res, StatusCodes.BAD_REQUEST, error)
    }
}

controllers.getActivityByID = async (req, res) => {
    try {
        const { id } = req.params
        const data = await models.getActivityByID(+id)
        response(res, StatusCodes.OK, data)
    } catch (error) {
        console.log(new Error(error).message)
        response(res, StatusCodes.BAD_REQUEST, error)
    }
}

controllers.addActivity = async (req, res) => {
    try {
        const { title, email } = req.body
        const data = await models.addActivity({ title, email })
        response(res, StatusCodes.CREATED, data)
    } catch (error) {
        console.log(new Error(error).message)
        response(res, StatusCodes.BAD_REQUEST, error)
    }
}

controllers.updateActivity = async (req, res) => {
    try {
        const { id } = req.params
        const { title } = req.body
        const data = await models.updateActivity({ title, id })
        response(res, StatusCodes.OK, data)
    } catch (error) {
        console.log(new Error(error).message)
        response(res, StatusCodes.BAD_REQUEST, error)
    }
}

controllers.deleteActivity = async (req, res) => {
    try {
        const { id } = req.params
        const data = await models.deleteActivity(+id)
        response(res, StatusCodes.OK, data)
    } catch (error) {
        console.log(new Error(error).message)
        response(res, StatusCodes.BAD_REQUEST, error)
    }
}

module.exports = controllers