
import crypto from 'crypto'
import fs from 'fs';


function generateRandomString(length) {
  return crypto.randomBytes(length).toString('hex');
}

const secretKey = generateRandomString(32); // Generate a 32-character (256-bit) random string

fs.writeFileSync('.env', `SECRET_KEY=${secretKey}`, { flag: 'a' });

console.log("Generated Secret Key:", secretKey);
