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
const profileRouter = require('./routes/profile');

const flairsRouter = require('./routes/flairs');
const currentUserFlairsRouter = require('./routes/currentUserFlairs');
const leadersRouter = require('./routes/leaders');
const chatListRouter = require('./routes/chatList');
const joinChatRouter = require('./routes/joinChat');
const farmsRouter = require('./routes/farms');
const farmResetRouter = require('./routes/farmReset');

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
  next();
});

app.get('/', (req, res) => {
  if (req.session.user_id) {
    res.render('app', {
      bundleURL
    });
  } else {
    res.render('index', { show_register: req.session.show_register });
  }
});

app.use('/login', loginRouter(knex));
app.use('/register', registerRouter(knex));
app.use('/currentUser', currentUserRouter(knex));
app.use('/logout', logoutRouter());
app.use('/flairs', flairsRouter(knex));
app.use('/currentUserFlairs', currentUserFlairsRouter(knex));
app.use('/profile', profileRouter(knex));
app.use('/leaders', leadersRouter(knex));
app.use('/chatList', chatListRouter(knex));
app.use('/joinChat', joinChatRouter(knex, getChatrooms, createNameSpace));
app.use('/farms', farmsRouter(knex));
app.use('/reset', farmResetRouter(knex));


function getChatrooms(data, createNameSpace){
  let listOfOnlineChatrooms = [];
  data.forEach((room) => {
    listOfOnlineChatrooms.push(room.chatroom_id);
  })

  listOfOnlineChatrooms = listOfOnlineChatrooms.filter(function (elem, index, self) {
    return index == self.indexOf(elem);
  })

  console.log("list of chatrooms", listOfOnlineChatrooms);

  listOfOnlineChatrooms.forEach((chatroomId) => {
    createNameSpace(chatroomId);
  })
}

function createNameSpace(chatroomId) {
  if (!io.nsps["/group-" + chatroomId]) {
    const group = io.of('/group-' + chatroomId);
    group.on('connection', (socket) => {
      const nspSockets = group.sockets;
      const noOfClients = Object.keys(nspSockets).length;
      console.log('Client connected');
      console.log("no of clients", noOfClients);
      const clients = io.sockets.clients();
      group.emit('data',JSON.stringify({ type: "clientCount", number: noOfClients }));
      
      socket.on('message', (message) => {
      let messageRecieved = JSON.parse(message);
      console.log("message recieved", messageRecieved);
      switch (messageRecieved.type) {
        case "incomingMessage":
          messageRecieved.id = uuidv4();
          group.emit('data', JSON.stringify(messageRecieved));
          // broadcast(JSON.stringify(messageRecieved));
          break;
        default:
          throw new Error("Unknown event type " + message.type);
      }
    });

    // Set up a callback for when a client closes the socket. This usually means they closed their broioer.
      socket.on('disconnecting', () => {
        console.log('Client disconnected');
        const nspSockets = group.sockets;
        const noOfClients = Object.keys(nspSockets).length;
        console.log("no of clients", noOfClients)
        group.emit('data', JSON.stringify({ type: "clientCount", number: noOfClients }))
      });
    });
  }
}


// USE THIS TO DRY CODE LATER
// This function broadcasts data to all clients connected to server 
// function broadcast(data) {
//   io.sockets.emit('data', data);
// }

// This function checks number of users connected to server and passes noOfClients to broadcast function
// function numberOfClients() {
//   const noOfClients = io.engine.clientsCount
//   console.log("no of clients", noOfClients)
//   const clients = io.sockets.clients()
//   broadcast(JSON.stringify({ type: "clientCount", number: noOfClients }));
// }

server.listen(process.env.PORT || 3000, () => {
  const address = server.address();
  console.log(`Server running on port ${address.port}`);
});
