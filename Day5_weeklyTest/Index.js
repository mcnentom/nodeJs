import express from 'express';
import  addJsonData  from './src/AddJson.js';
import fs from 'fs';
import path from 'path';



const app = express();
const PORT = 3000;

const dataFolder = path.join("src", 'data');
const productsDataFile = path.join(dataFolder, 'productsData.json');

//using the json file
app.use(express.json());


app.get('/api/products', (req, res) => {
    fs.readFile(productsDataFile, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(JSON.parse(data));
    });
});


app.post('/api/products', async (req, res) => {
    const { productName, productPrice, productDescription } = req.body;
    try {
        const newData = await addJsonData(productName, productPrice, productDescription);
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    fs.readFile(productsDataFile, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        let productsData = JSON.parse(data);
        const updatedData = productsData.filter(product => product.id !== productId);
        fs.writeFile(productsDataFile, JSON.stringify(updatedData, null, 2), err => {
            if (err) {
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(204).end();
        });
    });
});


app.put('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const { productName, productPrice, productDescription } = req.body;
    fs.readFile(productsDataFile, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        let productsData = JSON.parse(data);
        const updatedData = productsData.map(product => {
            if (product.id === productId) {
                return {
                    ...product,
                    productName,
                    productPrice,
                    productDescription
                };
            }
            return product;
        });
        fs.writeFile(productsDataFile, JSON.stringify(updatedData, null, 2), err => {
            if (err) {
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).end();
        });
    });
});


app.patch('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const { productName, productPrice, productDescription } = req.body;
    fs.readFile(productsDataFile, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        let productsData = JSON.parse(data);
        const updatedData = productsData.map(product => {
            if (product.id === productId) {
                return {
                    ...product,
                    ...(productName && { productName }),
                    ...(productPrice && { productPrice }),
                    ...(productDescription && { productDescription })
                };
            }
            return product;
        });
        fs.writeFile(productsDataFile, JSON.stringify(updatedData, null, 2), err => {
            if (err) {
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).end();
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
