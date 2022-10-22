const mysql = require('mysql2');

//connect mysql, and database to use
const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'a',
      database: 'company'
    });

  module.exports = connection;