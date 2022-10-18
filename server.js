const express = require('express');
//import and require mysql
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect mysql, and database to use
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company_db '
  },
  console.log(`Connected to the company_db database.`)
);

//query database
// check if select from is correct //
db.query('SELECT * FROM department', function (err, results) {
    console.log(results);
});
  
//bad request
app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});