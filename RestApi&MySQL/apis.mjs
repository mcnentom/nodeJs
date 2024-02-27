import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv'
dotenv.config();

const myfirstdb = mysql.createConnection({
    host: process.env.Db_host,
    user: process.env.Db_user_name,
    password: process.env.Db_password,
    database: process.env.Database

});

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
    })
})


const app = express();
app.use(express.json());
//posting a book
app.post('/books',(req, res)=>{
    const { title, author} = req.body;
    const sql = 'INSERT INTO books (title, author) VALUES (?, ?)';
    myfirstdb.query(sql, [title, author], (err, result)=>{
     if(err){
        res.status(500).send(err);
     }
     res.status(200).send('Insertion successful');
    })
})

//Getting a book
app.get('/books',(req,res)=>{
    const sql = 'SELECT * FROM books'
    myfirstdb.query(sql, (err,results)=>{
      if(err){
        res.status(500).send(err)
      }
      res.status(200).json(results)
    })
})

//Get a single book
app.get('/books/:id', (req,res)=>{
    const {id} = req.params;
    const sql = `SELECT * FROM books WHERE id = ${id}`;
    myfirstdb.query( sql, id,  (err,result)=>{
        if (err) {
            res.status(500).send(err);
        }else if( result.length === 0 ){
            res.status(404).send('Book not found')
        }
       res.status(200).json(result[0]);
    });
})

//update a book
app.put('/books/:id/', (req, res) => {
    const { id} = req.params;
    const { title, author } = req.body;
    const sql = 'UPDATE books SET title = ?, author  = ? WHERE id = ?';
    myfirstdb.query( sql , [ title, author, id], (err, result) => {
        if(err){
            res.status(err.status).send(err.message);
        }else if( result.affectedRows === 0 ){
            res.status(res.statusCode).send('Book not found');
        }
        res.status(res.statusCode).send('Book updated successfully')
    });
});

//deleteing a book
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM books WHERE id = ?';
    myfirstdb.query(sql, id, (err,result) => {
        if(err) {
            res.status(500).send('Error deleting the book')
        }else if( result.affectedRows === 0){
            res.status(404).send('Book not found')
        }
        res.status(200).send('Book deleted successfully');
    });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`listening on http://localhost:${PORT}`);
});