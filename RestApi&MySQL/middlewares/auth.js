// middlewares/auth.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv'

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (userId) => {
  const payload = {
      userId: userId
  };

  // Set the expiration time for the token, for example, 1 hour
  const expiresIn = '1m';

  // Sign the token with the payload, secret key, and expiration time
  return jwt.sign(payload, process.env.SECRET_KEY , { expiresIn });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch(error) {
        console.error(error);
        throw new Error("Failed to verify token");
    }
}

const generateHashedPassword = async (password) => {
  try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt)
      return hashedPassword;
  } catch (error) {
      console.error(error)
      throw error;
  }
}

// Returns a Promise<true or false>
const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    throw Error
  }
}

export { generateToken,verifyToken, comparePassword,generateHashedPassword }
