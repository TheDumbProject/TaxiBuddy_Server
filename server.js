const express = require('express');
const pool = require('./db');
const bodyParser = require('body-parser');
const app = express();
const queries = require('./src/queries');
const routes = require('./src/routes');
const initiatorRoutes = require('./src/InitiatorRoutes');
const verifyToken = require('./src/middlewares/verifyToken');
const checkInitiator = require('./src/middlewares/checkInitiator');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
var cors = require('cors');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.use(verifyToken);

app.use('/', routes);

initiatorRoutes.use(checkInitiator);

app.use((req, res) => {
  res.status(404).send('Route not found');
});

//Chatting
io.on('connection', (socket) => {
  console.log('User connected: ', socket.id);
  //on joining a booking
  socket.on('joinbooking', (bookingId) => {
    socket.join(`booking_${bookingId}`);
    console.log(`User ${socket.id} joined booking_${bookingId}`);
  });

  //sending a message
  socket.on('sendmessage', async ({ userId, bookingId, messageText }) => {
    try {
      const resultInsert = await pool.query(queries.insertMessage, [
        userId,
        bookingId,
        messageText,
      ]);
      console.log({
        userId: userId,
        bookingId: bookingId,
        messageText: messageText,
      });
      const resultFetch = await pool.query(queries.getMessages, [bookingId]);
      const message = resultFetch.rows[0];
      console.log(message);

      // console.log(resultFetch.rows);

      io.to(`booking_${bookingId}`).emit('newmessage', message);

      //disconnecting
      socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
      });
    } catch (error) {
      console.error(error);
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Running on : http://localhost:${process.env.PORT}`);
});
