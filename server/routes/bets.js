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
    const user_id = req.session.user_id;

    // Check if user entered ticker, wager, direction
    if (!ticker || !wager) {
      req.flash('errors', 'Input fields cannot be empty');
    }

    // Check if a bet is already placed on selected ticker
    knex("bets")
      .select(1)
      .where({ user_id })
      .limit(1)
      .then((bets) => {

        if (bets.length) {
          if (bets[0].ticker === ticker) {
            return Promise.reject({
              message: 'A bet for this stock has already been placed'
            });
          }
        }
        
      })
      .then(() => {

        return knex.insert({
          ticker,
          wager,
          direction,
          user_id
        }).into("bets")
          .catch((err) => {
            console.log("error in the insert", err);
          });

      })
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        req.flash('errors', err.message);
        res.redirect("/");
        console.log("error", err.message);
      });

  });
  return router;
}

module.exports = createRouter;