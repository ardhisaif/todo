const {Router} = require('express')
const router = Router()
const activity = require('./activity.router')
const todo = require('./todo.router')

router.get("/", (req, res) => {
    res.send("masuk")
})

router.use("/activity-groups", activity)
router.use("/todo-items", todo)

module.exports= router