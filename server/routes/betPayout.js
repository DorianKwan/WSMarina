const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.post("/", (req, res) => {

    const { percentChange, wager, ticker, currentUserRep } = req.body;
    const direction = req.body.direction === "Bull" ? true : false;
    const user_id = req.session.user_id;
    let payout;
    let rep;
    if (percentChange !== 0) {
      if (direction === "Bull") {
        payout = percentChange > 0 ? Number(wager) * 2 : 0;
      } else {
        payout = percentChange < 0 ? Number(wager) * 2 : 0;
      }
      rep = Number(currentUserRep) + payout;
    } else {
      payout = Number(wager);
      rep = Number(currentUserRep) + payout;
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