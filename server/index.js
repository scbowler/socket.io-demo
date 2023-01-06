require('dotenv/config');
const express = require('express');
const http = require('http');
// require in socket.io package
const socket = require('socket.io');
// require in socket events, you build this
const socketEvents = require('./socket-events');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');

const app = express();
// Needed for socket.io
// Creates a server conected with your express server
const server = http.Server(app);

app.use(staticMiddleware);

// Create socket server
const io = socket(server);
// Add socket event listeners/emitters
socketEvents(io);

// Create a middleware to make sockets (io)
// available to all your server routes,
// this allows you to emmit socket events from
// any of your server routes if you need to.
// This is optional, you might not need this
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Define all server routes as normal
app.get('/api/test', (req, res) => {

  // Example emit event from server route
  req.io.emit('message', { type: 'test', text: 'Someone tested the API' });

  res.json({ msg: 'This is a test endpoint' });
});

app.use(errorMiddleware);

// NOTE: Here we are calling listen from
// server NOT from app.
// This is for socket.io to work properlly,
// but since your express app is conected to
// the server this is all you need to start your
// app and server.
server.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
