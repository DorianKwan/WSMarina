const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.get("/", (req, res) => {
    knex('flairs')
      .select("image")
      .join('user_flairs', {'flairs.id': 'user_flairs.flair_id'})
      .then((flairs) => {
        res.send(flairs);
      });
  });

  return router;
}

module.exports = createRouter;
