const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'achttoene',
    port: '3306',
    password: '391351',
    database: 'acht_toene_db',
})

module.exports = db
