import https from "https";
import React from "react";

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function postTickers(input) {
  const username = "INTRINIO_API_USERNAME"; // TODO: use dotenv
  const password = "INTRINIO_API_PASSWORD";
  const auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

  input.map((ticker) => {
    const request = https.request({
      method: "GET",
      host: "api.intrinio.com",
      path: `/data_point?ticker=${ticker}&item=adj_close_price`,
      headers: {
        "Authorization": auth
      }

    }, (response) => {
      let json = "";
      response.on("data", (chunk) => {
        json += chunk;
      });

      response.on("end", function() {
        const section = document.getElementById("tickers");
        const data = JSON.parse(json);
        let span = createNode("span");
        span.innerHTML = `Ticker: ${data.identifier} Price: $${data.value} `;
        return append(section, span);
      });
    });

    request.end();
  });
}

export default React.createClass({
  componentDidMount() {
    const companies = ["GOOG", "TSLA", "MSFT", "FB", "AMZN"];
    postTickers(companies);
  },

  render() {
    return (
      <div id="tickers"></div>
    );
  }
});
