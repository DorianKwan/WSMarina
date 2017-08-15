const ENV = process.env.ENV || "development";
const express = require("express");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const knexLogger = require("knex-logger");

// const compression = require("compression");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// app.use(compression());

const currentUserRoute = require("./routes/currentUser");
const loginRoute = require("./routes/login")(knex);
const registerRoute = require("./routes/register")(knex);

app.use(cookieSession({
  name: "session",
  keys: [process.env.SESSION_SECRET || "development"]
}));

app.use(registerRoute);
app.use(loginRoute);

io.on("connection", (socket) => {
  console.log("Connected");
});

var PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Production API server running at localhost:" + PORT);
});
