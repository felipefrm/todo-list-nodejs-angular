
const mysql = require('mysql')

const db_connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'anotai'
});

module.exports = db_connection