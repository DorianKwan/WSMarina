const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.put("/", (req, res) => {

    const { slot_01, slot_02, slot_03, slot_04, slot_05 } = req.body;
    const created_at = slot_01.created_at;

    // Update farm slots
    knex("farms")
      .where({
        user_id: req.session.user_id
      })
      .update("slot_01", JSON.stringify({name: slot_01.name, created_at, collected_at: slot_01.collected_at}))
      .update("slot_02", JSON.stringify({name: slot_02.name, created_at, collected_at: slot_02.collected_at}))
      .update("slot_03", JSON.stringify({name: slot_03.name, created_at, collected_at: slot_03.collected_at}))
      .update("slot_04", JSON.stringify({name: slot_04.name, created_at, collected_at: slot_04.collected_at}))
      .update("slot_05", JSON.stringify({name: slot_05.name, created_at, collected_at: slot_05.collected_at}))
      .then(() => {
        res.json({result: "Record updated."});
      })
      .catch((err) => {
        res.json({"error": "Error has occured."});
      });
  });

  router.post("/", (req, res) => {

    const { currentUserId, currentUserRep, percentChange, index, name, created_at } = req.body;
    const slot = `slot_0${Number(index) + 1}`;
    const newRep = Number(percentChange) > 0 ? Number(currentUserRep) + 250 : Number(currentUserRep) + 100;
    
    // Update user rep and add a value to collected_at
    return knex("users")
      .where({ id: currentUserId })
      .update({ rep: newRep })
      .then(() => {
        return knex("farms").where("user_id", currentUserId).update(slot, JSON.stringify({ name, created_at, collected_at: new Date }));
      }).then(() => {
        return knex("farms").where("user_id", currentUserId).select("*");
      }).then((data) => {
        res.send(data[0]);
      }).catch((err) => {
        console.log(err);
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
        res.json({ status: 422, msg: "Error has occured on GET request to database." });
      });
  });
  return router;
}

module.exports = createRouter;
