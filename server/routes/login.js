const bcrypt = require("bcrypt");
const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.post("/", (req, res) => {

    // Check if user input exists
    if (!req.body.email || !req.body.password) {
      req.flash("errors", "Email or password cannot be empty.");
			res.redirect("/");
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
            message: "Email doesn't exist."
          });
        }

        // Check if username is already being used
        const comparePasswords = bcrypt.compare(req.body.password, user.password_digest);
        return comparePasswords.then((passwordsMatch) => {
          if (!passwordsMatch) {
            return Promise.reject({
              type: 409,
              message: "Incorrect password."
            });
          }

          return Promise.resolve(user);
        });
      }).then((user) => {

      // Set cookie to reflect logged in status and redirect to users page
      req.session.user_id = user.id;
      res.redirect('/');

    }).catch((err) => {
      req.flash('errors', err.message);
      res.redirect("/");
    });
  });

  return router;
}

module.exports = createRouter;
