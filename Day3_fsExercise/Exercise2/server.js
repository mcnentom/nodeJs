const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
    let filePath = './front' + req.url;

    if (filePath === './front/') {
        filePath = './front/Home.html';
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found!');
            } else {
                res.writeHead(500);
                res.end('Server error: ' + err.code);
            }
        } else {
           
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
});

const PORT =  3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
