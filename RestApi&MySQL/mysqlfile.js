// let mysql = require('mysql2');

// let con = mysql.createConnection({
//   host: "localhost",
//   user: "mcnen",
//   password: "tomisa013@14",
//   database: "mydb"
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   // creating databses
//   //   con.query("CREATE DATABASE mydb", function (err, result) {
//   //     if (err) throw err;
//   //     console.log("Database created");
//   //   })
//   // Creating tables
//   // let sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
//   // con.query(sql, function (err, result) {
//   //   if (err) throw err;
//   //   console.log("Table created");
//   // });
//   //   if the table already exists:  
//   // var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";

//   //inserting one record into the table
//   // var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
//   // con.query(sql, function (err, result) {
//   //   if (err) throw err;
//   //   console.log("1 record inserted");
//   // });
  
//   //inserting mulitple records into the table
//   // var sql = "INSERT INTO customers (name, address) VALUES ?";
//   // var values = [
//   //   ['John', 'Highway 71'],
//   //   ['Peter', 'Lowstreet 4'],
//   //   ['Amy', 'Apple st 652'],
//   //   ['Hannah', 'Mountain 21'],
//   //   ['Michael', 'Valley 345'],
//   //   ['Sandy', 'Ocean blvd 2'],
//   //   ['Betty', 'Green Grass 1'],
//   //   ['Richard', 'Sky st 331'],
//   //   ['Susan', 'One way 98'],
//   //   ['Vicky', 'Yellow Garden 2'],
//   //   ['Ben', 'Park Lane 38'],
//   //   ['William', 'Central st 954'],
//   //   ['Chuck', 'Main Road 989'],
//   //   ['Viola', 'Sideway 1633']
//   // ];
//   // con.query(sql, [values], function (err, result) {
//   //   if (err) throw err;
//   //   console.log("Number of records inserted: " + result.affectedRows);
//   //   console.log(result.affectedRows)
//   // });

//   //selecting from databases
//   // con.query("SELECT * FROM customers", function (err, result, fields) {
//   //   if (err) throw err;
//   //   // console.log(result);
//   //   console.log(fields);
//   // });

//   //selecting columns "SELECT name, address FROM customers"

//   //where statement
//   // con.query("SELECT * FROM customers WHERE address = 'Park Lane 38'", function (err, result) {
//   //   if (err) throw err;
//   //   console.log(result);
//   // });

//   //sorting the data
//   // 
  
//   //deleting elements
 
//   // to drop a table var sql = "DROP TABLE customers";
//   // to drop a table if it exists var sql = "DROP TABLE IF EXISTS customers";

//   // to update data 
//   // var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
//   // con.query(sql, function (err, result) {
//   //   if (err) throw err;
//   //   console.log(result.affectedRows + " record(s) updated");
//   // });

//   //to limit no of records returned
//   // var sql = "SELECT * FROM customers LIMIT 5";
//   // con.query(sql, function (err, result) {
//   //   if (err) throw err;
//   //   console.log(result);
//   // });

//   // to start from a certain pos use offset keyword as   var sql = "SELECT * FROM customers LIMIT 5 OFFSET 2";
//   // Or this shorter syntax can be used var sql = "SELECT * FROM customers LIMIT 2, 5"; this means limit to 2 data object but start from pos 6

//   // Joining tables: SELECT users.name AS user,
// // products.name AS favorite
// // FROM users
// // LEFT JOIN products ON users.favorite_product = products.id

// });