const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.put("/", (req, res) => {
    const { bio, image } = req.body;
    console.log("router connection:", req.body);
    console.log("req.session ", req.session.user_id);
    knex("users")
      .where({
        id: req.session.user_id
      }).update({bio, image})
        .then(res.json({test:'success updating user'}))
        .catch(e => {
          console.log(e);
          res.json({ status: 422, msg: 'world has ended' })
        })
  });

  router.get("/", (req, res) => {
    console.log("router connection:", req.body);
    console.log("req.session ", req.session.user_id);
    knex("users")
      .select("bio", "image", "rep", "username", "email")
      .where({
        id: req.session.user_id
      }).then((userInfo) => {
          console.log("test",userInfo)
          res.send(userInfo[0]);
        })
        .catch(e => {
          console.log(e);
          res.json({ status: 422, msg: 'cannot get from db' });
        })
  });
  return router;
}

module.exports = createRouter;
