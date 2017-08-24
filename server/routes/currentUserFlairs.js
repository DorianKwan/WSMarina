const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.get("/", (req, res) => {
    knex('flairs')
      .select("*")
      .join('user_flairs', {'flairs.id': 'user_flairs.flair_id'})
      .where({user_id: req.session.user_id})
      .then((flairs) => {
        res.send(flairs);
      });
  });

  router.delete("/", (req, res) => {
    knex('user_flairs')
      .where({ flair_id: req.body.flairId, user_id: req.session.user_id, id: req.body.id})
      .del()
    .then(() => {
      return knex('flairs')
        .select("*")
        .join('user_flairs', { 'flairs.id': 'user_flairs.flair_id' })
        .where({ user_id: req.session.user_id })
    }).then((flairs) => {
      res.send(flairs);
    });
  });

  return router;
}

module.exports = createRouter;
