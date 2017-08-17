const bcrypt = require("bcrypt");
const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.post("/", (req, res) => {

    // Check if user input exists
    if (!req.body.email || !req.body.password) {
      res.sendStatus(410);
      return;
    }

    // Check if user email is already being used
    knex("users")
      .select("*")
      .where({
        email: req.body.email
      })
      .limit(1)
      .then((rows) => {

        const user = rows[0];
        if (!user) {
          return Promise.reject({
            type: 409,
            message: "Email is already being used"
          });
        }

        // Check if username is already being used
        const comparePasswords = bcrypt.compare(req.body.password, user.password_digest);
        return comparePasswords.then((passwordsMatch) => {


          if (!passwordsMatch) {
            return Promise.reject({
              type: 409,
              message: "Username is already being used"
            });
          }

          return Promise.resolve(user);
        });
      }).then((user) => {

      // Set cookie to reflect logged in status and redirect to users page

      req.session.user_id = user.id;
      res.redirect('/');

    }).catch((err) => {

      // Lazy error handling
      // TODO: properly handle errors
      res.sendStatus(err.type);
    });
  });

  return router;
}

module.exports = createRouter;
