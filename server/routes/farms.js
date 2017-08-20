const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.put("/", (req, res) => {

    const { slot_01, slot_02, slot_03, slot_04, slot_05 } = req.body;

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
      .then(function(values){
        res.json({result: "Record updated."});
      })
      .catch((err) => {
        res.json({"error": "Error has occured."});
      });
  });

  router.post("/", (req, res) => {

    const { currentUserId, currentUserRep, open, currentPrice, index, ticker } = req.body;
    const slot = `slot_0${index + 1}`;

    const newRep = currentPrice > open ? Number(currentUserRep) + 250 : Number(currentUserRep) + 100;
    return knex("users")
      .where("id", currentUserId)
      .update("rep", newRep)
      .then(() => {
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
        res.json({ status: 422, msg: 'Error has occured on GET request to database.' });
      });
  });
  return router;
}

module.exports = createRouter;
