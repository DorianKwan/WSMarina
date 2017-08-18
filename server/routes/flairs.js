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
    const newRep = req.body.currentUserRep - req.body.flairCost;
    return knex("user_flairs")
      .insert({
        user_id: req.body.currentUserId,
        flair_id: req.body.flairId
    }).then(() => {
     return knex("users").where("id", req.body.currentUserId).update("rep", newRep);
    }).then(() => {
      res.redirect("/");
    })
  });


  return router;
}

module.exports = createRouter;
