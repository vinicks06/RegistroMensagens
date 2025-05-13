const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'logs.txt');

async function registerLog(studentName) {
    const id = uuidv4();
    const timestamp = new Date().toISOString();
    const logEntry = `${id} - ${timestamp} - ${studentName}\n`;
    
    await fs.appendFile(LOG_FILE, logEntry);
    return id;
}

async function findLogById(id) {
    try {
        const logs = await fs.readFile(LOG_FILE, 'utf-8');
        const lines = logs.split('\n');
        return lines.find(line => line.startsWith(id));
    } catch (error) {
        return null;
    }
}

module.exports = { registerLog, findLogById };