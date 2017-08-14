import React from 'react'
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server'
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router'

import routes from './modules/routes.jsx'

const ENV = process.env.ENV || "development";
const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const flash = require("connect-flash");

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const knexLogger = require("knex-logger");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(compression())
// add path.join here
app.use(express.static(path.join(__dirname, 'public')))

const registerRoute = require("./routes/register")(knex, bcrypt);

app.use(registerRoute);

app.post('/login', (req, res) => {
  // Check for email match in db
  const findUserByEmail = knex('users')
    .select('id', 'name', 'password')
    .where({ email: req.body.email })
    .limit(1);
})

// function renderPage(appHtml) {
//   return `
//     <!doctype html public="storage">
//     <html>
//     <meta charset=utf-8/>
//     <title>W.S. Marina</title>
//     <link rel=stylesheet href=/index.css>
//     <div id=app>${appHtml}</div>
//     <script src="/bundle.js"></script>
//    `
// }

var PORT = process.env.PORT || 8080
app.listen(PORT, function () {
  console.log('Production Express server running at localhost:' + PORT)
})