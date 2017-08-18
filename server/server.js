require('dotenv').config();

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const bundleURL = process.env.NODE_ENV === 'production' ? '/bundle.js' : process.env.DEV_BUNDLE || 'http://localhost:8080/bundle.js';
const flash = require("connect-flash");

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const currentUserRouter = require('./routes/currentUser');
const logoutRouter = require('./routes/logout');
<<<<<<< HEAD
const usersRouter = require('./routes/users');

=======
const flairsRouter = require('./routes/flairs');
const currentUserFlairsRouter = require('./routes/currentUserFlairs');
>>>>>>> 1cb436e2cfdf7a74455146cb0c0f9cdf8b6e3b0b

app.set('view engine', 'ejs');

app.use(cookieSession({
  secret: process.env.SESSION_SECRET || 'development'
}));

app.use(flash());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(express.static('public'));

// Middleware for req.flash messages
app.use((req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.info = req.flash('info');
  next();
});

app.get('/', (req, res) => {
  if (req.session.user_id) {
    res.render('app', {
      bundleURL
    });
  } else {
    res.render('index');
  }
});

app.use('/login', loginRouter(knex));
app.use('/register', registerRouter(knex));
app.use('/currentUser', currentUserRouter(knex));
app.use('/logout', logoutRouter());
app.use('/flairs', flairsRouter(knex));
app.use('/currentUserFlairs', currentUserFlairsRouter(knex));
app.use('/users', usersRouter(knex));

// This function broadcasts data to all clients connected to server
function broadcast(data) {
  io.sockets.emit('data', data);
}

// This function checks number of users connected to server and passes noOfClients to broadcast function
function numberOfClients() {
  const noOfClients = io.engine.clientsCount;
  console.log("no of clients", noOfClients);
  const clients = io.sockets.clients();
  broadcast(JSON.stringify({ type: "clientCount", number: noOfClients }));
}

io.on("connection", (socket) => {
  console.log('Client connected');
  numberOfClients();

  // Each message recieved will given a random id
  socket.on('message', (message) => {
    let messageRecieved = JSON.parse(message);

    console.log(messageRecieved);
    switch (messageRecieved.type) {
    case "incomingNotification":
    case "incomingMessage":
      messageRecieved.id = uuidv4();
      broadcast(JSON.stringify(messageRecieved));
      break;
    default:
      throw new Error("Unknown event type " + message.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their broioer.
  socket.on('disconnecting', () => {
    console.log('Client disconnected');
    numberOfClients();
  });
});

server.listen(process.env.PORT || 3000, () => {
  const address = server.address();
  console.log(`Server running on port ${address.port}`);
});
