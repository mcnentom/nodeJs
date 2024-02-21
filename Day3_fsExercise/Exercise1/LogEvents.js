const { format } = require('date-fns');
const { v4: uuidv4 } = require('uuid');
const fsPromise = require('fs').promises;
const fs = require('fs');
const path = require('path');



const LogEvents = async () => {
    const dateTime = `${format(new Date(), 'yyyy:MM:dd\tHH:mm:ss')}`;
    const id = uuidv4();
    try {
       
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromise.mkdir(path.join(__dirname, 'logs'))
        }
        const logItem = `new  id : ${id} at ${dateTime}`
        await fsPromise.appendFile("logs/logsFile.txt", JSON.stringify(logItem) + '\n');
        console.log("new id created successfully");
    } catch (error) {

        console.log(`Error ${error.message}`);
    }
}
module.exports = LogEvents;
