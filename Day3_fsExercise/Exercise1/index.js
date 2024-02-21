const EventEmitter = require('events');
const LogEvents = require('./LogEvents');

const eventEmitter = new EventEmitter();
eventEmitter.on('logEvent', async (message) => {
    console.log( message);
    await LogEvents();
});
setInterval(()=>{
    eventEmitter.emit('logEvent', 'New log event emitted.'); 
}, 2000);


