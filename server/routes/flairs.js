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

  router.post("/", (req, res) => {
    console.log(req.body)
    return knex("user_flairs")
      .insert({
        user_id: req.body.currentUserId,
        flair_id: req.body.flairId
    }).then(() => {
      res.redirect("/");
    });
  });


  return router;
}

module.exports = createRouter;
