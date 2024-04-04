// LogViewer.js
import React, { useState, useEffect } from 'react';

function LogViewer() {
  const [logLines, setLogLines] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected to server');
    };

    socket.onmessage = (event) => {
      const newLines = event.data.split('\n').filter(line => line.trim() !== '');
      setLogLines(prevLines => [...prevLines, ...newLines]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    socket.onclose = () => {
      console.log('Connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Log Viewer</h1>
      <div>
        {logLines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default LogViewer;
