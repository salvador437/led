const { SerialPort } = require('serialport');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir archivos estáticos
app.use(express.static(__dirname + '/'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = new SerialPort({ path: 'COM5', baudRate: 9600 });

port.on('open', () => {
  console.log('Serial Port Opened');
});

port.on('error', (err) => {
  console.error('Error: ', err.message);
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('ledState', (data) => {
    console.log(`LED${data.led} State: `, data.state);
    const message = data.led === 1 ? (data.state ? '1' : '0') : (!data.state ? '3' : '2');
    port.write(message, (err) => {
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log('Message written');
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});