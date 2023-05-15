require('dotenv').config()
const express = require('express');
const app = express();
const mysql = require('mysql')
const port = process.env.PORT

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DBNAME,
  port: process.env.MYSQL_PORT
})

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



db.query(`DROP TABLE IF EXISTS todos;`, (err, result) => {
    if (err) {
    console.error('Error performing database migration: ', err);
    process.exit();
    }
    
    db.query(`DROP TABLE IF EXISTS activities;`, (err, result) => {
        if (err) {
        console.error('Error performing database migration: ', err);
        process.exit();
        }
        console.log('Migration down successful!');
        process.exit();
    });
});

