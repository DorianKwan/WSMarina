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
    knex('chatrooms')
      .select("*")
      .where({ name: req.body.chatname, isActive: false })
      .limit(1)
      .then((chatroom) => {
        if (chatroom.length) {
          return knex("chatrooms")
            .update({ isActive: true, user_id: req.session.user_id })
            .where({ name: req.body.chatname})
            .then(() => {
              return knex("chatrooms")
                .select("*")
            }).then((newchatlist) => {
              res.send(newchatlist)
            })
        } else {
          return knex("chatrooms")
            .insert({
              name: req.body.chatname,
              user_id: req.body.currentUserId
            }).then(() => {
              return knex("chatrooms")
                .select("*");
            }).then((newchatlist) => {
              res.send(newchatlist);
            });
        }
      });
  });

  router.put("/", (req, res) => {
    return knex("chatrooms")
      .update({isActive: false})
      .where({ id: req.body.chatroomId, user_id: req.body.currentUserId})
    .then(() => {
      return knex("chatrooms")
        .select("*")
    }).then((newchatlist) => {
      res.send(newchatlist)
    })
  });

  return router;
}

module.exports = createRouter;
