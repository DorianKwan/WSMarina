/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(2);

	var _reactRouter = __webpack_require__(3);

	var _routes = __webpack_require__(4);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// and these to match the url to routes and then render
	var express = __webpack_require__(10);
	// we'll use this to render our app to an html string

	var path = __webpack_require__(11);
	var compression = __webpack_require__(12);
	var app = express();
	var bodyParser = __webpack_require__(13);
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.use(compression());
	// add path.join here
	app.use(express.static(path.join(__dirname, 'public')));

	// ...

	app.post('/register', function (req, res) {
	  console.log("wat");
	  console.log(req.body);
	  console.log("---------------------------------------------------------------");
	  res.send("HOLY SHIT success!");
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
	});

	function renderPage(appHtml) {
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <title>W.S. Marina</title>\n    <link rel=stylesheet href=/index.css>\n    <div id=app>' + appHtml + '</div>\n    <script src="/bundle.js"></script>\n   ';
	}

	var PORT = process.env.PORT || 8080;
	app.listen(PORT, function () {
	  console.log('Production Express server running at localhost:' + PORT);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("react-dom/server");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("react-router");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	var _App = __webpack_require__(5);

	var _App2 = _interopRequireDefault(_App);

	var _Login = __webpack_require__(7);

	var _Login2 = _interopRequireDefault(_Login);

	var _Register = __webpack_require__(8);

	var _Register2 = _interopRequireDefault(_Register);

	var _Home = __webpack_require__(9);

	var _Home2 = _interopRequireDefault(_Home);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/login', component: _Login2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/register', component: _Register2.default })
	);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _NavLink = __webpack_require__(6);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'App',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h1',
	        null,
	        'W.S. Marina'
	      ),
	      _react2.default.createElement(
	        'h2',
	        null,
	        '...because you need a second yacht'
	      ),
	      _react2.default.createElement(
	        'ul',
	        { role: 'nav' },
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/', onlyActiveOnIndex: true },
	            'Home'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/login' },
	            'Login'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/register' },
	            'Register'
	          )
	        )
	      ),
	      this.props.children
	    );
	  }
	});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	    displayName: 'NavLink',
	    render: function render() {
	        return _react2.default.createElement(_reactRouter.Link, _extends({}, this.props, { activeClassName: 'active' }));
	    }
	});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Login',

	  contextTypes: {
	    router: _react2.default.PropTypes.object
	  },

	  handleSubmit: function handleSubmit(event) {
	    event.preventDefault();
	    var email = event.target.elements[0].value;
	    var password = event.target.elements[1].value;
	    var path = '/login/' + email + '/' + password;
	    console.log(path);
	    this.context.router.push(path);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'form',
	      { onSubmit: this.handleSubmit },
	      _react2.default.createElement('input', { type: 'text', placeholder: 'email' }),
	      ' ',
	      ' ',
	      _react2.default.createElement('input', { type: 'text', placeholder: 'password' }),
	      ' ',
	      _react2.default.createElement(
	        'button',
	        { type: 'submit' },
	        'Go'
	      )
	    );
	  }
	});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Register',

	  contextTypes: {
	    router: _react2.default.PropTypes.object
	  },

	  handleSubmit: function handleSubmit(event) {
	    event.preventDefault();
	    var username = event.target.elements[0].value;
	    var email = event.target.elements[1].value;
	    var password = event.target.elements[2].value;
	    var password_confirmation = event.target.elements[3].value;
	    var date_of_birth = event.target.elements[4].value;

	    var body = JSON.stringify({
	      username: "hi",
	      email: "hi",
	      password: "hi",
	      password_confirmation: "hi",
	      date_of_birth: "hi"
	    });

	    fetch('/register', {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	        'Content-Length': new Buffer(body).length
	      },
	      body: body
	    }).then(function (response) {
	      console.log(response);
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'form',
	      { onSubmit: this.handleSubmit },
	      _react2.default.createElement('input', { type: 'text', placeholder: 'name' }),
	      ' ',
	      ' ',
	      _react2.default.createElement('input', { type: 'text', placeholder: 'email' }),
	      ' ',
	      ' ',
	      _react2.default.createElement('input', { type: 'text', placeholder: 'password' }),
	      ' ',
	      ' ',
	      _react2.default.createElement('input', { type: 'text', placeholder: 'password confirmation' }),
	      ' ',
	      ' ',
	      _react2.default.createElement('input', { type: 'text', placeholder: 'date of birth' }),
	      ' ',
	      ' ',
	      _react2.default.createElement(
	        'button',
	        { type: 'submit' },
	        'Register'
	      )
	    );
	  }
	});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	    displayName: 'Home',
	    render: function render() {
	        return _react2.default.createElement(
	            'div',
	            null,
	            'JOIN OUR COMMUNITY NOW!'
	        );
	    }
	});

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("compression");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = require("body-parser");

/***/ })
/******/ ]);