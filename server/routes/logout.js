const express = require("express");

function createRouter() {
  const router = express.Router();

  router.post("/", (req, res) => {
    req.session.user_id = null;
    res.redirect("/");
  });

  return router;
}

module.exports = createRouter;
