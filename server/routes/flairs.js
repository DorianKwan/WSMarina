const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.get("/", (req, res) => {
    knex("flairs")
      .select('*')
      .then((flairs) => {
        res.send(flairs);
      });
  });
  return router;
}

module.exports = createRouter;
