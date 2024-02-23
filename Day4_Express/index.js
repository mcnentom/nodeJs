import express from 'express';
import fs from 'fs';
const app = express();
const Port = process.env.Port || 8000;
// app.get("/", (req, res) => {
//     res.send("Hello world!");
//     if (err) throw err;
// })
app.get("/data", (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
            return;
        }
        try {
            const jsonData = JSON.parse(data)
            res.json(jsonData)
        } catch (error) {
            console.log("error", error);
        }
    });
});
app.get('/data/:id', (req, res) => {
    
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Internal Server Error" });
        }
        try {
            const userData = JSON.parse(data);
            const myData = userData.products; 
            const parsedId = parseInt(req.params.id); 
            if (isNaN(parsedId)) return res.status(400).send({ message: "Bad request. Invalid id" });
            const findUser = myData.find(user => user.id === parsedId);
            if (!findUser) return res.sendStatus(404); 
            res.send(findUser);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    });
});

app.listen(Port, () => {
    console.log(`Server is running at http://localhost:${Port}`)
}) 
