import express from 'express';
import productsRouter from './src/routes/Products.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/products', productsRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
