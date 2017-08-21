const express = require("express");

function createRouter(knex) {
  const router = express.Router();
  router.get("/", (req, res) => {

    const user_id = req.session.user_id;

    knex("bets")
      .where({ user_id })
      .select("ticker", "wager", "direction", "created_at", "start_price")
      .then((bets) => {
        res.send(bets);
      })
      .catch((err) => {
        console.log(err);
        res.json({"error": "Error has occured."});
      });
  });

  router.post("/", (req, res) => {

    const { ticker, wager, direction } = req.body;

    // Check if user entered ticker, wager, direction
    if (!ticker || !wager || direction === null) {
      req.flash('errors', 'Input fields cannot be empty');
    }

    // Check if a bet is already placed on selected ticker
    knex("bets")
      .select(1)
      .where("user_id", req.session.user_id)
      .limit(1)
      .then((bets) => {

        if (bets.length) {
          return Promise.reject({
            message: 'A bet for this stock has already been placed'
          });
        }
        
      }).then(() => {

        knex("bets")
          .insert({
            ticker,
            wager,
            direction
          });

      }).catch((err) => {
        req.flash('errors', err.message);
        res.redirect("/");
      });

  });
  return router;
}

module.exports = createRouter;
