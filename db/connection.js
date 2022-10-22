const mysql = require('mysql2');

//connect mysql, and database to use
const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'a',
      database: 'company_db '
    },
    console.log(`Connected to the company_db database.`)
  );

  module.exports = connection;