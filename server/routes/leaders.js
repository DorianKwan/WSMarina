const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.get("/", (req, res) => {
    knex("users")
      .select("username", "rep")
      .orderBy("rep", "desc")
      .limit(10)
      .then((leaders) => {
        res.send(leaders);
      });
  });
  return router;
}

module.exports = createRouter;
