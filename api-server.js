const ENV = process.env.ENV || "development";
const express = require('express');
// const compression = require('compression');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");


const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const knexLogger = require("knex-logger");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// app.use(compression())

const registerRoute = require("./routes/register")(knex);
const loginRoute = require("./routes/login")(knex);
const currentUserRoute = require("./routes/currentUser")

app.use(cookieSession({
  name: "session",
  keys: [process.env.SESSION_SECRET || 'development']
}));

app.use(registerRoute);
app.use(loginRoute);

io.on('connection', (socket) => {
  console.log("connected");
})


var PORT = process.env.PORT || 3000
server.listen(PORT, function () {
  console.log('Production API server running at localhost:' + PORT);
})