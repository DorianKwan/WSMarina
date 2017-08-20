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
      .update("slot_01", JSON.stringify({name: slot_01.name, collected_at: slot_01.collected_at}))
      .update("slot_02", JSON.stringify({name: slot_02.name, collected_at: slot_02.collected_at}))
      .update("slot_03", JSON.stringify({name: slot_03.name, collected_at: slot_03.collected_at}))
      .update("slot_04", JSON.stringify({name: slot_04.name, collected_at: slot_04.collected_at}))
      .update("slot_05", JSON.stringify({name: slot_05.name, collected_at: slot_05.collected_at}))
      .then(function(values){
        res.json({result: "Record updated."});
      })
      .catch((err) => {
        res.json({"error": "Error has occured."});
      });
  });

  router.post("/", (req, res) => {

    const { currentUserId, currentUserRep, open, currentPrice, index, ticker } = req.body;
    const slot = `slot_0${Number(index) + 1}`;
    const newRep = currentPrice > open ? Number(currentUserRep) + 250 : Number(currentUserRep) + 100;
    
    // Update user rep and add a value to collected_at
    return knex("users")
      .where("id", currentUserId)
      .update("rep", newRep)
      .then(() => {
        return knex("farms").where("user_id", currentUserId).update(slot, JSON.stringify({ name: ticker, collected_at: new Date }));
      })
      .then(() => {
        res.redirect("/");
      });
  });

  router.get("/", (req, res) => {

    // Get farm data 
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
