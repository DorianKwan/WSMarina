const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.post("/", (req, res) => {

    const { percentChange, wager, ticker, currentUserRep } = req.body;
    const user_id = req.session.user_id;
    const payout = percentChange > 0 ? wager * 2 : wager * -1;
    const rep = Number(currentUserRep) + Number(payout);

    // Find bet and update the columns
    knex("bets")
      .where({
        user_id,
        ticker
      })
      .update("collected_at", new Date)
      .update("payout", payout)
      .then(() => {

        // Update user rep 
        knex("users")
          .where({ id: user_id })
          .update({ rep })
          .catch((err) => {
            console.log("error", err);
          });

        console.log("Updated");
      })
      .catch((err) => {
        console.log("error occured", err);
        res.json({result: err});
      });
  });

  return router;
}

module.exports = createRouter;