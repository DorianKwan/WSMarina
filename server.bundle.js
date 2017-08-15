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
	var ENV = process.env.ENV || "development";
	// we'll use this to render our app to an html string

	var express = __webpack_require__(10);
	var path = __webpack_require__(11);
	var compression = __webpack_require__(12);
	var app = express();
	var bodyParser = __webpack_require__(13);
	var cookieSession = __webpack_require__(14);
	var flash = __webpack_require__(15);

	var knexConfig = __webpack_require__(16);
	var knex = __webpack_require__(18)(knexConfig[ENV]);
	var knexLogger = __webpack_require__(19);
	var bcrypt = __webpack_require__(20);

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.use(compression());
	// add path.join here
	app.use(express.static(path.join(__dirname, 'public')));

	var registerRoute = __webpack_require__(21)(knex, bcrypt);
	var loginRoute = __webpack_require__(22)(knex, bcrypt);

	app.use(cookieSession({
	  name: "session",
	  keys: [process.env.SESSION_SECRET || 'development']
	}));

	app.use(registerRoute);
	app.use(loginRoute);

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

	    var body = JSON.stringify({
	      email: email,
	      password: password
	    });

	    fetch('/login', {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	        'Content-Length': new Buffer(body).length
	      },
	      body: body
	    }).then(function (response) {
	      console.log(response);
	      if (response.status === 200) {
	        alert('Logged in successfully!');
	      } else if (response.status === 409) {
	        alert('Bad credentials!');
	      } else if (response.status === 410) {
	        alert('Email or password cannot be blank!');
	      } else {
	        alert('Something went wrong!');
	      }
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'form',
	      { onSubmit: this.handleSubmit },
	      _react2.default.createElement('input', { type: 'text', placeholder: 'email' }),
	      ' ',
	      ' ',
	      _react2.default.createElement('input', { type: 'password', placeholder: 'password' }),
	      ' ',
	      _react2.default.createElement(
	        'button',
	        { type: 'submit' },
	        'Log in'
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
	      username: username,
	      email: email,
	      password: password,
	      password_confirmation: password_confirmation,
	      date_of_birth: date_of_birth
	    });

	    if (new Date().getFullYear() - date_of_birth.substring(0, 4) < 21) {
	      alert('You are underage!');
	      event.preventDefault();
	      return;
	    }
	    if (password !== password_confirmation) {
	      alert('Your passwords do not match!');
	      event.preventDefault();
	      return;
	    }

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
	      if (response.status === 200) {
	        alert('Your account has been created successfully!');
	      } else if (response.status === 409) {
	        alert('Email already exist!');
	      } else if (response.status === 410) {
	        alert('Username already exist!');
	      } else {
	        alert('Email or password cannot be empty!');
	      }
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'form',
	      { onSubmit: this.handleSubmit },
	      _react2.default.createElement('input', { type: 'text', placeholder: 'name' }),
	      ' ',
	      ' ',
	      _react2.default.createElement('input', { type: 'email', placeholder: 'email' }),
	      ' ',
	      ' ',
	      _react2.default.createElement('input', { type: 'password', placeholder: 'password' }),
	      ' ',
	      ' ',
	      _react2.default.createElement('input', { type: 'password', placeholder: 'password confirmation' }),
	      ' ',
	      ' ',
	      _react2.default.createElement('input', { type: 'date', placeholder: 'date of birth' }),
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

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = require("cookie-session");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = require("connect-flash");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(17).config();

	module.exports = {

	  development: {
	    client: 'postgresql',
	    connection: {
	      database: process.env.DB_NAME,
	      user: process.env.DB_USER,
	      password: process.env.DB_PASS
	    },
	    migrations: {
	      directory: './db/migrations'
	    }
	  },

	  staging: {
	    client: 'postgresql',
	    connection: {
	      database: 'my_db',
	      user: 'username',
	      password: 'password'
	    },
	    pool: {
	      min: 2,
	      max: 10
	    },
	    migrations: {
	      tableName: 'knex_migrations'
	    }
	  },

	  production: {
	    client: 'postgresql',
	    connection: {
	      database: 'my_db',
	      user: 'username',
	      password: 'password'
	    },
	    pool: {
	      min: 2,
	      max: 10
	    },
	    migrations: {
	      tableName: 'knex_migrations'
	    }
	  }

	};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = require("dotenv");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = require("knex");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = require("knex-logger");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = require("bcrypt");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var express = __webpack_require__(10);

	function createRouter(knex, bcrypt) {
	  var router = express.Router();

	  router.post("/register", function (req, res) {
	    // Guard function to check bad input
	    if (!req.body.email || !req.body.password) {
	      res.sendStatus(400);
	      return;
	    }

	    // knex("users")
	    //   .select(1)
	    //   .where({ username: req.body.username })
	    //   .limit(1)
	    // .then((rows) => {
	    //   if (rows.length) {
	    //     return Promise.reject({
	    //       type: 410,
	    //       message: "username already exists"
	    //     });
	    //   }
	    //   return;
	    // }).catch((err) => {
	    //   res.sendStatus(err.type)
	    // });


	    var matchProvidedEmail = knex("users").select(1).where({ email: req.body.email }).limit(1);

	    matchProvidedEmail.then(function (rows) {
	      if (rows.length) {
	        return Promise.reject({
	          type: 409,
	          message: "email already exists"
	        });
	      }
	      return bcrypt.hash(req.body.password, 10);
	    }).then(function (encryptedPassword) {
	      return knex("users").insert({
	        username: req.body.username,
	        email: req.body.email,
	        password_digest: encryptedPassword,
	        date_of_birth: req.body.date_of_birth
	      });
	    }).then(function () {
	      return knex("users").select("id").where({ email: req.body.email }).limit(1);
	    }).then(function (rows) {
	      req.session.user_id = rows[0].id;
	      console.log(req.session.user_id);
	      res.sendStatus(200);
	    }).catch(function (err) {
	      res.sendStatus(err.type);
	    });
	  });
	  return router;
	}

	module.exports = createRouter;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var express = __webpack_require__(10);

	function createRouter(knex, bcrypt) {
		var router = express.Router();

		router.post("/login", function (req, res) {
			// Guard function to check for bad input
			if (!req.body.email || !req.body.password) {
				console.log("Test1");
				res.sendStatus(410);
				return;
			}
			// Check for email match in db
			knex('users').select('*').where({ email: req.body.email }).limit(1).then(function (rows) {
				console.log("Test2");
				var user = rows[0];
				if (!user) {
					return Promise.reject({
						type: 409,
						message: 'Bad credentials!'
					});
				}
				// If user exists, check for password match
				var comparePasswords = bcrypt.compare(req.body.password, user.password_digest);

				return comparePasswords.then(function (passwordsMatch) {
					console.log("Test3");
					if (!passwordsMatch) {
						return Promise.reject({
							type: 409,
							message: 'Bad credentials!'
						});
					}
					return Promise.resolve(user);
				});
			}).then(function (user) {
				console.log("Test4");
				// Log user in
				req.session.user_id = user.id;
				// Redirect to users page
				res.sendStatus(200);

				// If chain is broken by error:
			}).catch(function (err) {
				console.log("Test5");
				res.sendStatus(err.type);
			});
		});
		return router;
	}
	module.exports = createRouter;

/***/ })
/******/ ]);