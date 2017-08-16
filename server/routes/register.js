const bcrypt = require("bcrypt");
const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.post("/", (req, res) => {
    console.log("req.body.email");

    // Check if user input exists
    if (!req.body.email || !req.body.password) {
      res.sendStatus(400);
      return;
    }

    // Check if username is already being used
    knex("users")
      .select(1)
      .where({
        username: req.body.username
      })
      .limit(1)
      .then((rows) => {
        if (rows.length) {
          return Promise.reject({
            type: 410,
            message: "Username is already being used"
          });
        }
        return;

      }).catch((err) => {
      res.sendStatus(err.type);
    });

    // Check if email is already being used
    const matchProvidedEmail = knex("users")
      .select(1)
      .where({
        email: req.body.email
      })
      .limit(1);

    matchProvidedEmail.then((rows) => {

      if (rows.length) {
        return Promise.reject({
          type: 409,
          message: "Email is already being used"
        });
      }

      // Encrypt password
      return bcrypt.hash(req.body.password, 10);

    }).then((encryptedPassword) => {

      // Save user details into database
      return knex("users").insert({
        username: req.body.username,
        email: req.body.email,
        password_digest: encryptedPassword,
        date_of_birth: req.body.date_of_birth
      });

    }).then(() => {

      // Select newly created user
      return knex("users")
        .select("id")
        .where({
          email: req.body.email
        })
        .limit(1);

    }).then((rows) => {

      // Set cookie to reflect logged in status and redirect to users page
      req.session.user_id = rows[0].id;
      console.log(req.session.user_id);
      res.redirect('/');

    }).catch((err) => {

      // Lazy error handling
      // TODO: handle errors properly
      res.sendStatus(err.type);
    });
  });
  return router;
}

module.exports = createRouter;
