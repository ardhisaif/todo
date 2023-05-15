const models = {}
const db = require('../database/connection')


models.getAllActivity = async (activity_group_id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM activities`,
            (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            }
        )
    })
}

models.getActivityByID = async (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM activities WHERE activity_id=?`, [ id ],
            (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return reject(new Error(`Activity with ID ${id} Not Found`))
                return resolve(results[0]);
            }
        )
    })
}

models.addActivity = async ({title, email}) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO activities (title, email) VALUES(?, ?)`, [ title, email ],
            (err, results) => {
                if (err) return reject(err);
                return resolve({id:results.insertId});
            }
        )
    })
}

models.updateActivity = async ({title, id}) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE activities SET title=? WHERE activity_id=?`, [ title, id ],
            (err, results) => {
                if (err) return reject(err);
                if (!results.affectedRows) return reject(new Error(`Activity with ID ${id} Not Found`))
                return resolve(results.affectedRows);
            }
        )
    })
}

models.deleteActivity = async (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM activities WHERE activity_id=?`, [ id ],
            (err, results) => {
                if (err) return reject(err);
                if (results.affectedRows === 0) return reject(new Error(`Activity with ID ${id} Not Found`))
                return resolve({results});
            }
        )
    })
}

module.exports = models
