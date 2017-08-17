const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.get("/", (req, res) => {
    console.log(req.session.user_id)
    knex("users")
      .select("id","username","email","bio","image","rep" )
      .where({
        id: req.session.user_id
      })
      .limit(1)
    .then((userInfo) => {
      res.send(userInfo[0]);
    });
  });
  return router;
}

module.exports = createRouter;
