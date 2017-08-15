const express = require('express');
const bcrypt = require('bcrypt');

function createRouter(knex) {
  const router = express.Router();

  router.post("/currentUser", (req, res) => {
   
  });
  return router
}
module.exports = createRouter;