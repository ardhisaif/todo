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
        response(res, StatusCodes.BAD_REQUEST, new Error(error).message)
    }
}

controllers.getActivityByID = async (req, res) => {
    try {
        const { id } = req.params
        const data = await models.getActivityByID(+id)
        response(res, StatusCodes.OK, data)
    } catch (error) {
        console.log(new Error(error).message)
        response(res, StatusCodes.BAD_REQUEST, new Error(error).message)
    }
}

controllers.addActivity = async (req, res) => {
    try {
        const { title, email } = req.body
        const myTitle = title ? title : "New Activity"
        const activity = await models.addActivity({ title:myTitle, email })
        const data = await models.getActivityByID(activity.id)
        response(res, StatusCodes.CREATED, data[0])
    } catch (error) {
        console.log(new Error(error).message)
        response(res, StatusCodes.BAD_REQUEST, new Error(error).message)
    }
}

controllers.updateActivity = async (req, res) => {
    try {
        const { id } = req.params
        const { title } = req.body
        if (title === "" || title === undefined ) throw new Error("title cannot be null")
        const updated = await models.updateActivity({ title, id })
        if (!updated) throw new Error(`Activity with ID ${id} Not Found`)
        
        const data = await models.getActivityByID(+id)
        response(res, StatusCodes.OK, data)
    } catch (error) {
        console.log(new Error(error).message)
        response(res, StatusCodes.BAD_REQUEST, new Error(error).message)
    }
}

controllers.deleteActivity = async (req, res) => {
    try {
        const { id } = req.params
        const data = await models.deleteActivity(+id)
        response(res, StatusCodes.OK, `activity with id ${id} successfuly deleted`)
    } catch (error) {
        console.log(new Error(error).message)
        response(res, StatusCodes.BAD_REQUEST, new Error(error).message)
    }
}

module.exports = controllers