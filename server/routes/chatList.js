const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.get("/", (req, res) => {
    knex("chatrooms")
      .select("*")
      .then((chatrooms) => {
        res.send(chatrooms);
      });
  });

  router.post("/", (req, res) => {
    return knex("chatrooms")
      .insert({
        name: req.body.chatname,
        user_id: req.body.currentUserId
      }).then(() => {
        return knex("chatrooms")
          .select("*")
      }).then((newchatlist) => {
        res.send(newchatlist)
      })
  });

  router.put("/", (req, res) => {
    console.log("entered Delete route")
    return knex("chatrooms")
    .update({isActive: false})
    .where({id: req.body.chatroomId})
    .then(() => {
      res.redirect("/")
    })
  });

  return router;
}

module.exports = createRouter;
