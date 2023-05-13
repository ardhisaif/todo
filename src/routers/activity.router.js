const express = require('express')
const router = express.Router()
const controller = require('../controllers/activity.controller')

router.get('/', controller.getAllActivity)
router.post('/', controller.addActivity)
router.get('/:id', controller.getActivityByID)
router.patch('/:id', controller.updateActivity)
router.delete('/:id', controller.deleteActivity)

module.exports = router