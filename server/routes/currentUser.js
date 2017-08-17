const bcrypt = require("bcrypt");
const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.get("/", (req, res) => {
    console.log(req.session.user_id)
    knex("users")
      .select("*")
      .where({
        id: req.session.user_id
      })
      .limit(1)
    .then((userInfo) => {
      console.log(userInfo)
      res.send(userInfo);
    });
  });
  return router;
}

module.exports = createRouter;
