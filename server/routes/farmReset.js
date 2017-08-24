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
      .update("slot_01", JSON.stringify({name: slot_01, created_at: new Date, collected_at: null}))
      .update("slot_02", JSON.stringify({name: slot_02, created_at: new Date, collected_at: null}))
      .update("slot_03", JSON.stringify({name: slot_03, created_at: new Date, collected_at: null}))
      .update("slot_04", JSON.stringify({name: slot_04, created_at: new Date, collected_at: null}))
      .update("slot_05", JSON.stringify({name: slot_05, created_at: new Date, collected_at: null}))
      .then(function(values){
        res.json({result: "Farm updated."});
      })
      .catch((err) => {
        res.json({"error": "Error has occured."});
      });
  });
  return router;
}

module.exports = createRouter;