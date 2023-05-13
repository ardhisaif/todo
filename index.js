require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT
const db = require("./src/database/connection")
const router = require('./src/routers/index.router')

app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(router)

db.connect((err) => {
    try {
        if (err) throw err;
        console.log('database connected')
        app.listen(port, () => {
            console.log(`server running on port ${port}`)
        })
    } catch (err) {
        console.log(err);
    }
    
});