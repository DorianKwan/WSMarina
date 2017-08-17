require('dotenv').config();

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const bundleURL = process.env.NODE_ENV === 'production' ? '/bundle.js' : process.env.DEV_BUNDLE || 'http://localhost:8080/bundle.js';
const flash = require("connect-flash");

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');

app.set('view engine', 'ejs');

app.use(cookieSession({
  secret: process.env.SESSION_SECRET || 'development'
}));

app.use(flash());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Middleware for req.flash messages
app.use((req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.info = req.flash('info');
  next();
});

app.get('/', function (req, res) {
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
app.use('/logout', logoutRouter(knex));

io.on("connection", (socket) => {
  console.log('Client connected');
  numberOfClients();

  // Each message recieved will given a random id
  socket.on('message', function incoming(message) {
    let messageRecieved = JSON.parse(message);
    console.log(messageReceived)
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


// This function broadcasts data to all clients connected to server
function broadcast(data) {
  io.sockets.emit('data', data);
}

// This function checks number of users connected to server and passes noOfClients to broadcast function
function numberOfClients() {
  const noOfClients = io.engine.clientsCount
  console.log("no of clients", noOfClients)
  const clients = io.sockets.clients()
  broadcast(JSON.stringify({ type: "clientCount", number: noOfClients }));
}


server.listen(process.env.PORT || 3000, () => {
  const address = server.address();
  console.log(`Server running on port ${address.port}`);
});
