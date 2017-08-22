const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.post("/", (req, res) => {

    const { percentChange, wager, ticker, currentUserRep, direction } = req.body;
    const user_id = req.session.user_id;
    let payout;
    if (direction === "Bull") {
      payout = percentChange > 0 ? Number(wager) * 2 : Number(wager) * -1;
    } else {
      payout = percentChange < 0 ? Number(wager) * 2 : Number(wager) * -1;
    }

    const rep = Number(currentUserRep) + payout;

    if (payout > 0) {
      payout = wager;
    }

    // Find bet and update the columns
    knex("bets")
      .where({
        user_id,
        ticker
      })
      .update("collected_at", new Date)
      .update({ payout })
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