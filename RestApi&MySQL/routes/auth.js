import { Router } from "express";
import {  validationResult,matchedData } from "express-validator";
import { query } from "./Queries.js";
import db from '../db.js';
import { generateHashedPassword, comparePassword ,generateToken,verifyToken} from '../middlewares/auth.js';


const authRouter = Router();

authRouter.post("/register", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "fail", errors: errors.array() });
        }

        const { email, username, password } = req.body;

        const existingUser = await query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ status: "fail", message: "User already exists" });
        }

        const hashedPassword = await generateHashedPassword(password);
        await query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
        
        res.status(201).json({ status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});
authRouter.post("/login", async (req, res) => {
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ status: "fail", errors: errors.array() });
      }

      const { username, password } = req.body;

      const user = await query('SELECT * FROM users WHERE username = ?', [username]);

      if (user.length === 0) {
          return res.status(401).json({ status: "fail", message: "Invalid username or password" });
      }

      const match = await comparePassword(password, user[0].password);

      if (!match) {
          return res.status(401).json({ status: "fail", message: "Invalid username or password" });
      }

      // Generate token
      const token = generateToken(user[0].id);
      req.session.user = user;
      // pass the token to a cookie
      res.cookie("auth_token", token)
      
      res.status(200).json({ status: "success", token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// GET /auth/logout
authRouter.get("/logout", async (req, res) => {
    res.clearCookie("auth_token");
    res.json({ status: "success", message: "User logged out" });
});

// GET /auth/verify-token
authRouter.get("/verify-token", async (req, res) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(401).json({ status: "fail", message: "Token not provided" });
    }
    try {
        // Verify token
        const decoded = await verifyToken(token);
        res.status(200).json({ status: "success", data: decoded });
    } catch (error) {
        console.error(error);
        res.status(401).json({ status: "fail", message: "Failed to verify token" });
    }
});
// Assuming `query` is a function that queries the database
// const getUserByUsername = async (username) => {
//   try {
//       const [user] = await query('SELECT * FROM users WHERE username = ?', [username]);
//       return user;
//   } catch (error) {
//       console.error("Error fetching user by username:", error);
//       throw error;
//   }
// };

// Placeholder for the validationResult function
// const validationResult1 = (req) => {
//   // Assuming you're using a library like express-validator
//   return req.validationResult();
// };
// const loginUser = async (loginData) => {
//   try {
//       const rows = await query('SELECT * FROM users WHERE username = ?', [loginData.username]);
//       if (rows.length === 0) {
//           throw new Error("no such user");
//       }

//       const user = rows[0];
//       if (!(await comparePassword(loginData.password, user.password))) {
//           throw new Error("invalid login details");
//       }

//       const token = await generateToken({ username: user.username, email: user.email });
//       return [user, token];
//   } catch (error) {
//       throw error;
//   }
// };


export default authRouter;
