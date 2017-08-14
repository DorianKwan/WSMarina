const express = require("express");

function createRouter(knex, bcrypt) {
  const router = express.Router();

//   router.post("/register", (req, res) => {
//     const password_digest = bcrypt.hash(req.body.password, 10);
//     knex("users").insert({
//       username: req.body.username,
//       email: req.body.email,
//       password_digest: password_digest,
//       date_of_birth: req.body.date_of_birth
//     }).then(() => {
//       res.send('Success! Account created!')
//     });
//   });
//   return router;
// }

  router.post("/register", (req, res) => {
    // Guard function to check bad input
    if (!req.body.email || !req.body.password) {
      // res.send('blank email/pw!');
      // req.flash("errors", "email and password cannot be blank!");
      res.sendStatus(400)
      return;
    }

    knex("users")
      .select(1)
      .where({ username: req.body.username })
      .limit(1)
    .then((rows) => {
      if (rows.length) {
        return Promise.reject({
          type: 410,
          message: "username already exists"
        });
      }
      return;
    }).catch((err) => {
      // req.flash('errors', err.message);
      res.sendStatus(err.type)
    });


    const matchProvidedEmail = knex("users")
      .select(1)
      .where({ email: req.body.email })
      .limit(1);
      
    matchProvidedEmail.then((rows) => {
      if (rows.length) {
        return Promise.reject({
          type: 409,
          message: "email already exists"
        });
      }
      return bcrypt.hash(req.body.password, 10);
    }).then((encryptedPassword) => {
      return knex("users").insert({
        username: req.body.username,
        email: req.body.email,
        password_digest: encryptedPassword,
        date_of_birth: req.body.date_of_birth
      });
    }).then(() => {
      return knex("users")
        .select("id")
        .where({ email: req.body.email })
        .limit(1);
    }).then((rows) => {
      console.log('hellllllllllllllllllllllllllllo')
      console.log('ROW' + row[0].id)
      console.log(req.session.user_id)
      res.session.user_id = rows[0].id;
      console.log(req.session.user_id)
      // req.flash("info", "Account created successfully");
      res.sendStatus(200)

    }).catch((err) => {
      // req.flash('errors', err.message);
      res.sendStatus(err.type)
    });
  });
  return router;
}

module.exports = createRouter;