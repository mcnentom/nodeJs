import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv'
import basicAuth from 'express-basic-auth'
import bcrypt from 'bcrypt'
dotenv.config();

const app = express();
app.use(express.json());
const myfirstdb = mysql.createConnection({
    host: process.env.Db_host,
    user: process.env.Db_user_name,
    password: process.env.Db_password,
    database: process.env.Database

});

// const authenticate = basicAuth({
//     users: { 'mcnen': 'mcnen123' },
//     unauthorizedResponse: { message: 'Unauthorized' }
// });

// const base64Credentials = Buffer.from('mcnen:mcnen123').toString('base64');
// console.log(base64Credentials);
  
myfirstdb.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("mysql connected");

    //create database
    myfirstdb.query("CREATE DATABASE IF NOT EXISTS Books", (err, data) => {
        if (err) {
            throw err;
        }
        console.log("Database created");
    });
    myfirstdb.query("USE Books", (err, result) => {
        if (err) {
            throw err;
        }
        // create table
        let myData = " CREATE TABLE IF NOT EXISTS books (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255),author VARCHAR(255))"
        myfirstdb.query(myData, (err, result) => {
            if (err) throw err;
            console.log("table created");
        })
        let myData2 = " CREATE TABLE IF NOT EXISTS myUser (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255),password VARCHAR(255),salt VARCHAR(255))"
        myfirstdb.query(myData2, (err, result) => {
            if (err) throw err;
            console.log("table created");
        })
    })
    
})



app.post('/register', (req, res) => {
    const { username, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            res.status(500).send('Error generating salt');
        } else {  
            bcrypt.hash(password, salt, (err, hashedPassword) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    const sql = 'INSERT INTO myUser (username, password, salt) VALUES (?, ?, ?)';
                    myfirstdb.query(sql, [username, hashedPassword, salt], (err, result) => {
                        if (err) {
                            res.status(500).send( err);
                        } else {
                            res.status(201).send('User created successfully');
                        }
                    });
                }
            });
        }
    });
});

// //posting a book
// app.post('/books', authenticate,(req, res)=>{
//     const { title, author} = req.body;
//     const sql = 'INSERT INTO books (title, author) VALUES (?, ?)';
//     myfirstdb.query(sql, [title, author], (err, result)=>{
//      if(err){
//         res.status(500).send(err);
//      }
//      res.status(200).send('Insertion successful');
//     })
// })

// //Getting a book
// app.get('/books',  authenticate,(req,res)=>{
//     const sql = 'SELECT * FROM books'
//     myfirstdb.query(sql, (err,results)=>{
//       if(err){
//         res.status(500).send(err)
//       }
//       res.status(200).json(results)
//     })
// })

// //Get a single book
// app.get('/books/:id', authenticate, (req,res)=>{
//     const {id} = req.params;
//     const sql = `SELECT * FROM books WHERE id = ${id}`;
//     myfirstdb.query( sql, id,  (err,result)=>{
//         if (err) {
//             res.status(500).send(err);
//         }else if( result.length === 0 ){
//             res.status(404).send('Book not found')
//         }
//        res.status(200).json(result[0]);
//     });
// })

// //update a book
// app.put('/books/:id/', authenticate, (req, res) => {
//     const { id} = req.params;
//     const { title, author } = req.body;
//     const sql = 'UPDATE books SET title = ?, author  = ? WHERE id = ?';
//     myfirstdb.query( sql , [ title, author, id], (err, result) => {
//         if(err){
//             res.status(err.status).send(err.message);
//         }else if( result.affectedRows === 0 ){
//             res.status(res.statusCode).send('Book not found');
//         }
//         res.status(res.statusCode).send('Book updated successfully')
//     });
// });

// //partial update
// app.patch('/books/:id', authenticate,(req, res)=>{
//     const {id}= req.params;
//     const { title, author} = req.body;

//     let myUpdate = {};
//     if(title){
//         myUpdate.title = title;
//     }
//     if(author){
//         myUpdate.author = author;
//     }

//     if(Object.keys(myUpdate).length === 0){
//         res.status(400).send("No update found");
//         return;
//     }
//     let sql = 'UPDATE books SET';
//     let Values = [];
//      for ( const field in myUpdate ){
//         sql+= ` ${field} = ?,`;
//         Values.push(myUpdate[field]);
//      }
//      sql = sql.slice(0, -1);
//      sql += ' WHERE id = ?';
//      Values.push(id);

//      myfirstdb.query(sql, Values, (err, data) => {
//         if(err){
//             res.status(500).send("Error updating")
//            return;
//         }else if( data.affectedRows === 0){
//             res.status(404).send('File not found')
//            return;
//         }
//         res.status(200).send("Update successful")
//      })
// })


// //deleting a book
// app.delete('/books/:id', authenticate, (req, res) => {
//     const { id } = req.params;
//     const sql = 'DELETE FROM books WHERE id = ?';
//     myfirstdb.query(sql, id, (err,result) => {
//         if(err) {
//             res.status(500).send('Error deleting the book')
//         }else if( result.affectedRows === 0){
//             res.status(404).send('Book not found')
//         }
//         res.status(200).send('Book deleted successfully');
//     });
// })

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`listening on http://localhost:${PORT}`);
});