const express = require("express");
const request = require("request");

function createRouter() {
  const router = express.Router();

  router.get("/", (req, res) => {
    const newsapiKey = process.env.NEWSAPI_KEY;
    const url = `https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=${newsapiKey}`;
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