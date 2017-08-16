const bcrypt = require("bcrypt");
const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.post("/currentUser", (req, res) => {

  });

  return router;
}

module.exports = createRouter;
