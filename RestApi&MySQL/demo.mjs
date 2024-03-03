import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server listening on http://localhost:${PORT}`);
})

let myDatabase = mysql.createConnection(
    {
        host: process.env.Db_host,
        user: process.env.Db_user_name,
        password: process.env.Db_password
    }
)
myDatabase.connect((err, db) => {
    if (err) {
        throw err;
    }
    console.log("mysql connected successfully");

    // create a new database
    let newdb = ("CREATE DATABASE IF NOT EXISTS collection");
    myDatabase.query(newdb, (err, db) => {
        if (err) {
            throw  err;
        }
        console.log("Database created successfully");
    });
    myDatabase.query("Use collection", (err, db) => {
        if (err) {
            throw err;
        }
        let newTb = ("CREATE TABLE IF NOT EXISTS myTable (id INTEGER PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, age INTEGER(10) NOT NULL)")
        myDatabase.query(newTb, (err, result) => {
            if (err) {
                throw err;
            }
            console.log("new table created");

        })
    });
});

//get all data
app.get('/table', (req, res) => {
    const sql = 'SELECT * FROM myTable'
    myDatabase.query(sql, (err, data) => {
        if (err) {
            res.status(500).send('Error fetching data');
        }
        res.status(200).json(data);
    })
});

//post data.
app.post('/table', (req, res) => {
    const {name , age} = req.body;
    const sql = 'INSERT INTO myTable (name, age) VALUES (?, ?)';
    myDatabase.query(sql,[ name, age] ,(err, data) => {
        if(err){
            res.status(500).send('Error adding data');
        }
        res.status(200).send('Data added successfully');
    });

});



// get a single data item
app.get('/table/:id', (req, res)=>{
    const { id } = req.params;
    const sql = `SELECT * FROM myTable WHERE id = ${id}`;
    myDatabase.query(sql, id, (err,data)=>{
        if(err) {
            res.status(500).send('Error getting item');
        }else if( data.length === 0 ) {
            res.status(404).send('Item not found');
        }
        res.status(200).json(data[0]);
    });
})

// updating an item
app.put('/table/:id', (req, res) => {
    const {id} = req.params
    const { name, age} = req.body;
    const sql  = 'UPDATE myTable SET name = ?, age = ? WHERE id = ?';
    myDatabase.query(sql,[ name, age, id], (err, data) => {
        if(err){
            res.status(500).send('Error updating the table')

        }else if( data.affectedRows === 0){
            res.status(404).send('Item not found')
        }
        res.status(200).send('Data updated successfully')
    });
})

// partial updates

app.patch('/table/:id', (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    const updateFields = {};

    if (name) {
        updateFields.name = name;
    }
    if (age) {
        updateFields.age = age;
    }

    if (Object.keys(updateFields).length === 0) {
        res.status(400).send('No fields provided for update');
        return;
    }

    let sql = 'UPDATE myTable SET ';
    const values = [];
    for (const field in updateFields) {
        sql += `${field} = ?, `;
        values.push(updateFields[field]);
    }
    sql = sql.slice(0, -2); 
    sql += ' WHERE id = ?';
    values.push(id);

    myDatabase.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error patching data:', err);
            res.status(500).send('Error patching data');
        } else if (data.affectedRows === 0) {
            res.status(404).send('Data not found');
        } else {
            res.status(200).send('Data updated successfully');
        }
    });
});


//Delete data
app.delete('/table/:id',(req, res) => {
    const { id} = req.params;
    const sql = 'DELETE FROM myTable WHERE id = ?'
    myDatabase.query(sql,id, (err, data) => {
        if(err){
            res.status(500).send('Error deleting data')
        } else if( data.affectedRows === 0){
            res.status(404).send('Item not found')
        }
        res.status(200).send('Data deleted succesfully')
    })
})
