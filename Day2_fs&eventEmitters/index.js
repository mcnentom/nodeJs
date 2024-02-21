const fs = require('fs');
const path = require('path');

const sourceFilePath = path.join(__dirname, 'lorem.txt');
const destinationFilePath = path.join(__dirname, 'mylorem.txt');

const firstRead = fs.createReadStream(sourceFilePath, 'utf8',(err)=>{
    throw new Error(err.message)
});
const secondWrite = fs.createWriteStream(destinationFilePath, 'utf8',(err)=>{
    throw new Error(err.message)
});

firstRead.on("data", function(chunk) {
    secondWrite.write(chunk);
});