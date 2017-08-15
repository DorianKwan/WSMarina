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


app.use(compression())
// add path.join here
app.use(express.static(path.join(__dirname, 'public')))


// function renderPage(appHtml) {
//   return `
//     <!doctype html public="storage">
//     <html>ech
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