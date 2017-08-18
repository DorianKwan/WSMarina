const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.get("/", (req, res) => {
    knex("users")
      .orderBy('rep', 'desc')
    .then((leaders) => {
      console.log(leaders);
      res.send(leaders[0]);
    });
  });
  return router;
}

module.exports = createRouter;
