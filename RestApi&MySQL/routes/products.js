// routes/products.js
import express from 'express';
import db from '../db.js';
import authRouter from './auth.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { query } from './Queries.js';
import { verifyToken } from '../middlewares/auth.js';

dotenv.config()

const productsRouter = express.Router();





// GET /products - Get all products
productsRouter.get('/',  async (req, res) => {
  try {
    const sql = 'SELECT * FROM products';
    const rows =await query(sql);
    res.status(200).json({ status: 'success', data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// GET /products/:id - Get a product by ID
productsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';
    const rows = await query(sql, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Product not found' });
    }
    res.status(200).json({ status: 'success', data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// POST /products - Create a new product
productsRouter.post('/', async (req, res) => {
  try {
    const { name, price } = req.body;
    const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';
    const result = query(sql, [name, price]);
    res.status(201).json({ status: 'success', data: { id: result.insertId, name, price } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// PUT /products/:id - Update a product
productsRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
   query(sql, [name, price, id]);
    res.status(200).json({ status: 'success', message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});
// PATCH /products/:id - Update specific fields of a product
productsRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    // Constructing the SET part of the SQL query dynamically based on which fields are provided in the request body
    let updates = [];
    if (name) updates.push(`name = '${name}'`);
    if (price) updates.push(`price = '${price}'`);
    const setClause = updates.join(', ');

    if (!setClause) {
      return res.status(400).json({ status: 'fail', message: 'No fields to update provided' });
    }

    const sql = `UPDATE products SET ${setClause} WHERE id = ?`;
    await query(sql, [id]);
    res.status(200).json({ status: 'success', message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// DELETE /products/:id - Delete a product
productsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM products WHERE id = ?';
    query(sql, [id]);
    res.status(200).json({ status: 'success', message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

export default productsRouter;
