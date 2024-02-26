import express from 'express';
import { validationResult, check } from 'express-validator';
import { getProducts, addProduct, deleteProduct, updateProduct, patchProduct } from '../utilis/Data.js';

const router = express.Router();

router.get('/', (req, res) => {
    const products = getProducts();
    res.json(products);
});

router.post('/', [
   
    check('productName').notEmpty().withMessage('Product name is required'),
    check('productPrice').notEmpty().withMessage('Product price is required').isNumeric().withMessage('Product price must be a number'),
    check('productDescription').notEmpty().withMessage('Product description is required'),
], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { productName, productPrice, productDescription } = req.body;
    try {
        const newData = await addProduct(productName, productPrice, productDescription);
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', (req, res) => {
    const productId = req.params.id;
    deleteProduct(productId);
    res.status(204).end();
});

router.put('/:id', [
    check('productName').notEmpty().withMessage('Product name is required'),
    check('productPrice').notEmpty().withMessage('Product price is required').isNumeric().withMessage('Product price must be a number'),
    check('productDescription').notEmpty().withMessage('Product description is required'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const productId = req.params.id;
    const { productName, productPrice, productDescription } = req.body;
    updateProduct(productId, productName, productPrice, productDescription);
    res.status(200).end();
});

router.patch('/:id', (req, res) => {
    const productId = req.params.id;
    const { productName, productPrice, productDescription } = req.body;
    patchProduct(productId, productName, productPrice, productDescription);
    res.status(200).end();
});

export default router;
