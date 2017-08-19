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
const flairsRouter = require('./routes/flairs');
const currentUserFlairsRouter = require('./routes/currentUserFlairs');
const leadersRouter = require('./routes/leaders');

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
app.use('/leaders', leadersRouter(knex));

function broadcast(data) {
  if (data.type === "userCount") {
    io.sockets.emit('data', JSON.stringify(data));
  } else {
    io.sockets.emit('message', JSON.stringify(data));
  }
}

let userCount = 0;

function createMessage() {
  return {
    id: uuidv4(),
    color: "chatty",
    content: userCount,
    type: "userCount",
    username: "Chatty"
  };
}

function generateColor() {
  const hexChars = "0123456789ABCDEF";
  let hex = "#";

  for (var i = 0; i < 6; i++) {
    hex += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
  }

  return hex;
}

io.on("connection", (socket) => {
  console.log("Client connected");
  const color = generateColor();
  userCount++;
  broadcast(createMessage());

  socket.on('message', (msg) => {
    const message = JSON.parse(msg);
    message.id = uuidv4();
    message.color = color;

    broadcast(message);
  });

  socket.on('disconnecting', () => {
    console.log("Client disconnected");
    userCount--;
    broadcast(JSON.stringify(createMessage()));
  });
});

server.listen(process.env.PORT || 3000, () => {
  const address = server.address();
  console.log(`Server running on port ${address.port}`);
});
