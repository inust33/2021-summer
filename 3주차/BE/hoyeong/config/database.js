const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: '3.34.109.17',
    user: 'mwilliam55',
    port: '3306',
    password: 'dlghdud55!',
    database: 'HY'
});

module.exports = {
    pool: pool
};