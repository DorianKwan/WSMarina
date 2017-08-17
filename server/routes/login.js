const bcrypt = require("bcrypt");
const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.post("/", (req, res) => {

    // Check if user input exists
    if (!req.body.email || !req.body.password) {
      req.flash("errors", "email and password fields cannot be blank!");
			// res.redirect("/login");
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
            message: "Email is already being used!"
          });
        }

        // Check if username is already being used
        const comparePasswords = bcrypt.compare(req.body.password, user.password_digest);
        return comparePasswords.then((passwordsMatch) => {

          console.log("Test 3");
          if (!passwordsMatch) {
            return Promise.reject({
              type: 409,
              message: "Password is incorrect!"
            });
          }

          return Promise.resolve(user);
        });
      }).then((user) => {

      // Set cookie to reflect logged in status and redirect to users page
      req.session.user_id = user.id;
      req.flash("info", "Logged in successfully!");
      res.redirect('/');

    }).catch((err) => {
      req.flash('errors', err.message);
      // res.redirect("/login");
    });
  });

  return router;
}

module.exports = createRouter;
