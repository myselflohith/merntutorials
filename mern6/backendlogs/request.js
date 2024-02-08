const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'request.log');

const requestLog = (req,res,next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;

    const logMessage = `[${timestamp}] ${method} ${url}\n`;
    
    fs.appendFile(logFilePath, logMessage, (err) => {
        if(err) {
            console.log('error writing to log file', err)
        }
    });

    next();
}

module.exports = requestLog