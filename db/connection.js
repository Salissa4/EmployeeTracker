const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: ' ', //insert your password
      database: 'company'
    });

  module.exports = connection;