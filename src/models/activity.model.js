const models = {}
const db = require('../database/connection')


models.getAllActivity = async () => {
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
    console.log(id);
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM activities WHERE activity_id=?`, [ id ],
            (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            }
        )
    })
}

models.addActivity = async ({title, email}) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO activities (title, email) VALUES(?, ?)`, [ title, email ],
            (err, results) => {
                if (err) return reject(err);
                let data = {id:results.insertId, title, email}
                return resolve({data});
            }
        )
    })
}

models.updateActivity = async ({title, id}) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE activities SET title=? WHERE activity_id=?`, [ title, id ],
            (err, results) => {
                if (err) return reject(err);
                let data = {id, title}
                return resolve({data});
            }
        )
    })
}

models.deleteActivity = async (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM activities WHERE activity_id=?`, [ id ],
            (err, results) => {
                if (err) return reject(err);
                return resolve({results});
            }
        )
    })
}

module.exports = models
