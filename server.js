import React from 'react'
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server'
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
import routes from './modules/routes.jsx'

const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(compression())
// add path.join here
app.use(express.static(path.join(__dirname, 'public')))

// ...

app.post('/register', (req, res) => {
  console.log("wat")
  console.log(req.body)
  console.log("---------------------------------------------------------------")
  res.send("HOLY SHIT success!")
  // match({ routes: routes, location: req.url }, (err, redirect, props) => {
  //   // in here we can make some decisions all at once
  //   if (err) {
  //     // there was an error somewhere during route matching
  //     res.status(500).send(err.message)
  //   } else if (redirect) {
  //     // we haven't talked about `onEnter` hooks on routes, but before a
  //     // route is entered, it can redirect. Here we handle on the server.
  //     res.redirect(redirect.pathname + redirect.search)
  //   } else if (props) {
  //     // if we got props then we matched a route and can render
  //     const appHtml = renderToString(<RouterContext {...props} />)
  //     res.send(renderPage(appHtml))
  //   } else {
  //     // no errors, no redirect, we just didn't match anything
  //     res.status(404).send('Not Found')
  //   }
  // })
})

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>W.S. Marina</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

var PORT = process.env.PORT || 8080
app.listen(PORT, function () {
  console.log('Production Express server running at localhost:' + PORT)
})