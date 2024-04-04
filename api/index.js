const fs = require('fs');
const WebSocket = require('ws');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    
    }
));
// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Function to tail a file and send updates to connected clients


function tailAndStreamFile(filePath, ws) {
    let startOffset = Math.max(0, fs.statSync(filePath).size - 1024); // Ensure start offset is non-negative
    let tailStream = fs.createReadStream(filePath, { start: startOffset });

    tailStream.on('data', (data) => {
        ws.send(data.toString());
    });

    fs.watchFile(filePath, () => {
        tailStream.close();
        startOffset = Math.max(0, fs.statSync(filePath).size - 1024); // Update start offset
        tailStream = fs.createReadStream(filePath, { start: startOffset });
        tailStream.on('data', (data) => {
            ws.send(data.toString());
        });
    });
}

// Handle WebSocket connections
wss.on('connection', (ws) => {
    tailAndStreamFile('./mylogfile.txt', ws); // Replace '/path/to/logfile.log' with actual path to your log file
});
