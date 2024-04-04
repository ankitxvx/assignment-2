const fs = require('fs');

const logFilePath = './mylogfile.txt';  

// Function to write a message to the log file
function writeToLog(message) {
  const timestamp = new Date().toISOString(); // Get current timestamp
  const logEntry = `[${timestamp}] ${message}\n`; // Format log entry

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    } else {
      console.log('Log message written:', message);
    }
  });
}

// Example usage:
const message = 'This is a test message for the log file.';
writeToLog(message);
