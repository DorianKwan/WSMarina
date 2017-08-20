const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.get("/", (req, res) => {
    knex('chatroomusers')
      .select("*")
      .then((chatroomInfo) => {
        res.send(chatroomInfo);
      });
  });

  router.post("/", (req, res) => {
    knex('chatroomusers')
      .select("*")
      .where({ user_id: req.body.currentUserId })
      .limit(1)
      .then((user) => {

        if (user.length) {

          return knex("chatroomusers")
          .where({ user_id: req.body.currentUserId })
          .update({ chatroom_id: req.body.chatroomId })
          .then(() => {
            res.redirect("/")
          })
        } else {
          
          return knex("chatroomusers")
          .insert({
            chatroom_id: req.body.chatroomId,
            user_id: req.body.currentUserId
          }).then(() => {
            return knex("chatroomusers")
              .select("*")
          }).then((newchatlist) => {
            res.send(newchatlist)
          })
        }
      });
  });
  return router;
}

module.exports = createRouter;
