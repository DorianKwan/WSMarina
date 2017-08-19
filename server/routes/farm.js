const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.put("/farm", (req, res) => {

    const { slot_01, slot_02, slot_03, slot_04, slot_05 } = req.body;

    // Check if user input exists
    if (!slot_01 || !slot_02 || !slot_03 || !slot_04 || !slot_05) {
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
        slot_01,
        slot_02,
        slot_03,
        slot_04,
        slot_05
      })
      .catch((err) => {
        req.flash('errors', err.message);
        res.redirect("/");
      });
  });

  router.get("/", (req, res) => {
    knex("farms")
      .where({
        user_id: req.session.user_id
      })
      .select("slot_01", "slot_02", "slot_03", "slot_04", "slot_05")
      .then((slots) => {
        res.send(slots[0]);
      })
      .catch(error => {
        console.log(error);
        res.json({ status: 422, msg: 'Request to DB failed.' });
      });
  });
  return router;
}

module.exports = createRouter;
