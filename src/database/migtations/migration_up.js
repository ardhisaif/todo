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



db.query(`CREATE TABLE IF NOT EXISTS activities(
    activity_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	title VARCHAR(100) NOT NULL,
	email VARCHAR(255),
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (activity_id)
)`, (err, result) => {
    if (err) {
    console.error('Error performing database migration: ', err);
    return;
    }
    
    db.query(`CREATE TABLE IF NOT EXISTS todos(
        todo_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        activity_group_id BIGINT UNSIGNED NOT NULL,
        title VARCHAR(255) NOT NULL,
        priority VARCHAR(50),
        is_active BOOLEAN,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (todo_id),
        FOREIGN KEY (activity_group_id) REFERENCES activities(activity_id) ON DELETE CASCADE
    );`, (err, result) => {
        if (err) {
        console.error('Error performing database migration: ', err);
        process.exit();
        }
        console.log('Migration up successful!');
        process.exit();
    });
});

