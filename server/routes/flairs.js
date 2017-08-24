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
        return knex('users').join('user_flairs', 'users.id', 'user_flairs.user_id').join('flairs','user_flairs.flair_id','flairs.id')
          .select('users.username as user', 'users.rep as rep', 'users.id as user_id','user_flairs.flair_id as flair_id','flairs.image as image')
          .where({ user_id: req.session.user_id })
      }).then((userInfo) => {
        console.log("userinfo", userInfo);
        res.send(userInfo);
      })
  });
  return router;
}

module.exports = createRouter;
