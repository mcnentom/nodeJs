// app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import db from './db.js';
// import { authenticateToken  } from './routes/products.js';
import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';
import dotenv from 'dotenv'
import { protectedRoute} from  './routes/Queries.js';
 dotenv.config()

const app = express();
const port = 3000;


app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: process.env.SECRET_KEY }));

app.use('/auth', authRouter);
app.use('/products', protectedRoute, productsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
