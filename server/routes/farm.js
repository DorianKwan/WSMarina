const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.post("/farm", (req, res) => {

    // Check if user input exists
    if (!req.body.slot_1 || !req.body.slot_2 || !req.body.slot_3 || !req.body.slot_4 || !req.body.slot_5) {
      req.flash("errors", "Please select a ticker for each input field.");
      res.redirect("/");
      return;
    }

    // Update farm slots
    knex("farms")
      .where({
        user_id: req.session.user_id
      })
      .update({
        slot_1: req.body.slot_1,
        slot_2: req.body.slot_2,
        slot_3: req.body.slot_3,
        slot_4: req.body.slot_4,
        slot_5: req.body.slot_5
      })
      .catch((err) => {
        req.flash('errors', err.message);
        res.redirect("/");
      });
  });
  return router;
}

module.exports = createRouter;
