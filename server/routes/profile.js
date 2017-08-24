const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.put("/", (req, res) => {
    const { bio, image } = req.body;
    knex("users")
      .where({
        id: req.session.user_id
      }).update({ bio, image })
      .then(() => {
        return knex("users")
          .where({id: req.session.user_id})
          .select("bio", "image", "rep", "username", "email")
      }).then((userInfo) => {
        res.send(userInfo[0]);
      })
      .catch(e => {
        res.json({ status: 422, msg: "world has ended" });
      });
  });

  return router;
}

module.exports = createRouter;
