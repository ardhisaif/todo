const models = {}
const db = require('../database/connection')


models.getAllTodo = async (activity_group_id) => {
    if (activity_group_id === undefined) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM todos`,
                (err, results) => {
                    if (err) return reject(err);
                    return resolve(results);
                }
            )
        })
    }

    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM todos WHERE activity_group_id=?`, [ activity_group_id ],
            (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            }
        )
    })
}

models.getTodoByID = async (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM todos WHERE todo_id=?`, [ id ],
            (err, results) => {
                if (err) return reject(err);
                return resolve(results[0]);
            }
        )
    })
}

models.addTodo = async ({ title, activity_group_id, is_active, priority }) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO todos (title, activity_group_id, is_active, priority) VALUES(?, ?, ?, ?)`, [ title, activity_group_id, is_active, priority ],
            (err, results) => {
                if (err) return reject(err);
                return resolve(results.insertId);
            }
        )
    })
}

models.updateTodo = async ({title, is_active, priority, id}) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE todos SET title=?, is_active=?, priority=? WHERE todo_id=?`, [ title, is_active, priority, id ],
            (err, results) => {
                if (err) return reject(err);
                if (!results.affectedRows) return reject(new Error(`Todo with ID ${id} Not Found`))
                return resolve(results.affectedRows);
            }
        )
    })
}

models.deleteTodo = async (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM todos WHERE todo_id=?`, [ id ],
            (err, results) => {
                if (err) return reject(err);
                if (!results.affectedRows) return reject(new Error(`Todo with ID ${id} Not Found`))
                return resolve({results});
            }
        )
    })
}

module.exports = models
