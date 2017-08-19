const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.put("/farm", (req, res) => {

    const { slot_1, slot_2, slot_3, slot_4, slot_5 } = req.body;

    // Check if user input exists
    if (!slot_1 || !slot_2 || !slot_3 || !slot_4 || !slot_5) {
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
        slot_1,
        slot_2,
        slot_3,
        slot_4,
        slot_5
      })
      .catch((err) => {
        req.flash('errors', err.message);
        res.redirect("/");
      });
  });
  return router;
}

module.exports = createRouter;
