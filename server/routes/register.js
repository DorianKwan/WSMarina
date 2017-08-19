const bcrypt = require('bcrypt');
const express = require('express');

function createRouter(knex) {
  const router = express.Router();

  router.post('/', (req, res) => {

    // Check if user entered username, email, and password
    if (!req.body.username || !req.body.email || !req.body.password) {
      req.flash('errors', 'Input fields cannot be empty');
    }

    // Check if password and password confirmation match
    if (req.body.password !== req.body.password_confirmation) {
      req.flash('errors', 'Passwords do not match');
    }

    // Check if age is 21 or over
    if (new Date().getFullYear() - req.body.date_of_birth.substring(0, 4) < 21) {
      req.flash('errors', 'You must be at least 21 years old');
    }

    // Check if user entered date of birth
    if (!req.body.date_of_birth) {
      req.flash('errors', 'Date of birth field cannot be empty');
    }

    // Check if username is already being used
    knex('users')
      .select(1)
      .where({ username: req.body.username })
      .limit(1)
      .then((rows) => {

        if (rows.length) {
          return Promise.reject({
            message: 'Username is already being used'
          });
        }

      }).catch((err) => {
        req.flash('errors', err.message);
        res.redirect("/");
      });

        req.session.show_register = true;
        req.flash('errors', err.message);
        res.redirect('/');

      });

    knex('users')
      .select(1)
      .where({ email: req.body.email })
      .limit(1)
      .then((rows) => {

        if (rows.length) {
          return Promise.reject({
            message: 'Email is already being used'
          });
        }

        // Encrypt password
        return bcrypt.hash(req.body.password, 10);

      }).then((encryptedPassword) => {

        // Save user details into database
        return knex('users').insert({
          username: req.body.username,
          email: req.body.email,
          password_digest: encryptedPassword,
          date_of_birth: req.body.date_of_birth
        });

      }).then(() => {

        // Select newly created user
        return knex('users')
          .select('id')
          .where({ email: req.body.email })
          .limit(1);

      }).then((rows) => {

        // Set cookie to indicate logged in status and redirect to users page
        req.session.user_id = rows[0].id;
        req.session.show_register = false;
        return user;

      }).then((user) => {

        return knex('farms').insert({
          user_id: user
        });

      }).then(() => {

        res.redirect('/');

      }).catch((err) => {

        req.session.show_register = true;

        // Prevent error message that reveals sensitive information from showing
        if (err.message.substr(0, 6) !== 'insert') {
          req.flash('errors', err.message);
        }

        res.redirect('/');

      });
  });

  return router;
}

module.exports = createRouter;
