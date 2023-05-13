const {Router} = require('express')
const router = Router()
const activity = require('./activity.router')

router.get("/", (req, res) => {
    res.send("masuk")
})

router.use("/activity-groups", activity)

module.exports= router