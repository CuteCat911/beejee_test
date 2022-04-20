const config = require('config')
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: config.db.host,
    database: config.db.name,
    user: config.db.user,
    password: config.db.password
})

module.exports = {
    async query (query, params) {
        if (!query) {
            return
        }

        return new Promise((resolve, reject) => {
            const callbackFunc = (error, results) => {
                if (error) {
                    reject(error)
                    return
                }

                resolve(results)
            }

            if (params) {
                connection.query(query, params, callbackFunc)
            } else {
                connection.query(query, callbackFunc)
            }
        })
    }
}
