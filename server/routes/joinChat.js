const express = require("express");

function createRouter(knex, getChatrooms, createNameSpace) {
  const router = express.Router();
  const app = express(); 
  router.get("/", (req, res) => {
    knex('chatroomusers').select(['chatroomusers.*','chatrooms.name'])
      .join('chatrooms', { 'chatrooms.id': 'chatroomusers.chatroom_id' })
      .then((chatroomInfo) => {
        getChatrooms(chatroomInfo, createNameSpace)
        res.send(chatroomInfo);
      })
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
            return knex('chatroomusers').select(['chatroomusers.*', 'chatrooms.name'])
              .join('chatrooms', { 'chatrooms.id': 'chatroomusers.chatroom_id' })
         }).then((newchatlist) => {
            res.send(newchatlist)
          })
        } else {
          return knex("chatroomusers")
          .insert({
            chatroom_id: req.body.chatroomId,
            user_id: req.body.currentUserId
          }).then(() => {
            return knex('chatroomusers').select(['chatroomusers.*', 'chatrooms.name'])
              .join('chatrooms', { 'chatrooms.id': 'chatroomusers.chatroom_id' })
          }).then((newchatlist) => {
            res.send(newchatlist)
          })
        }
      });
  });
  return router;
}

module.exports = createRouter;
