const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.get("/", (req, res) => {
    knex("chatrooms")
      .select("*")
      .then((chatrooms) => {
        res.send(chatrooms);
      });
  });
  return router;
}

module.exports = createRouter;
