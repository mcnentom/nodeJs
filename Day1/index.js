const data = require('http');
// const received = require('./db.json');
// const requestListener = (req, res) =>{
//     JSON.stringify(received)

// }
// const required = data.createServer(requestListener);
// const Port = 3000;
// required.listen(Port,'localhost',()=>console.log(`The server is running on ${Port}`));
const fs = require('fs');
const myserver = data.createServer((req, res)=>{
    fs.readFile('db.json',(err, data)=>{
        if (err){ throw err;
        res.end(JSON.stringify({error: `internal error`}))
        return;
    }
    res.end(data)
 })
})
const Port = 3000;
myserver.listen(Port,()=>{
    console.log(`server listening on http://localhost:${Port}`);
})