const express = require("express");
const request = require("request");

function createRouter() {
  const router = express.Router();

  router.get("/", (req, res) => {
    const alphavantageKey = process.env.ALPHAVANTAGE_KEY;
    const ticker = req.query.symbol;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${alphavantageKey}`;

    request({url, json: true}, (err, resp, remoteResult) => {
      if (err) {
        throw err;
      }
      res.json(remoteResult);
    });
  });
  return router;
}

module.exports = createRouter;
