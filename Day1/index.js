const data = require('http');
const received = require('./db.json');
const requestListener = (req, res) =>{
    JSON.stringify(received)

}
const required = data.createServer(requestListener);
const Port = 3000;
required.listen(Port,'localhost',()=>console.log(`The server is running on ${Port}`));
