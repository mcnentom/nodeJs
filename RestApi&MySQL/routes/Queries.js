import db from '../db.js'
import { verifyToken } from "../middlewares/auth.js";

export function query(sql, params) {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  }


  export async function protectedRoute(req, res, next) {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(401).send({ status: "fail", message: "Unauthorized: Token missing" });
    }
    try {
        console.log("Verifying token...");
        await verifyToken(token);
        console.log("Token verified successfully.");
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).send({ status: "fail", message: "Unauthorized: Invalid token" });
    }
}


