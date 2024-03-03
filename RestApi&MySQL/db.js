// db.js
import mysql from 'mysql2';
import dotenv from 'dotenv'

dotenv.config();

// MySQL connection configuration
const connection = mysql.createConnection({
  host: process.env.Db_host,
  user: process.env.Db_user_name,
  password: process.env.Db_password,
 
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');

 let Database = 'CREATE DATABASE IF NOT EXISTS mybooks';
 connection.query(Database, (err, result) => {
    if(err) throw err;
    console.log("Database created successfully");
 })

 connection.query('Use mybooks', (err, result) => {
    if(err) throw err;
    let mytable = 'CREATE TABLE IF NOT EXISTS users(id INT AUTO_INCREMENT PRIMARY KEY , username VARCHAR(255), password VARCHAR(255), email VARCHAR(255))';
    connection.query(mytable, (err, result) => {
        if (err) throw err;
        console.log("table created");
    })
    let mytable2 = 'CREATE TABLE IF NOT EXISTS products(id INT AUTO_INCREMENT PRIMARY KEY , name VARCHAR(255), price INT)';
    connection.query(mytable2, (err, result) => {
        if (err) throw err;
        console.log("table created");
    })
 })
});
// Export the connection
export default connection;
