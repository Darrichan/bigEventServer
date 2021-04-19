const mysql = require('mysql')
const db = mysql.createPool({
    host: 'rm-uf6475k576gviok6o8o.mysql.rds.aliyuncs.com',
    user: 'darrichan',
    password: '770528Cq',
    database: 'database_1'
})

module.exports = db