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
      }).update({ bio, image })
        .then(res.json({test:'success updating user'}))
        .catch(e => {
          console.log(e);
          res.json({ status: 422, msg: 'world has ended' })
        })
  })
  return router;
}

module.exports = createRouter;
