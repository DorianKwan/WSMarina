import https from "https";
import React from "react";

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function postArticles(amount) {
  const username = "INTRINIO_API_USERNAME"; // TODO: use dotenv
  const password = "INTRINIO_API_PASSWORD";
  const auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
  const request = https.request({
    method: "GET",
    host: "api.intrinio.com",
    path: "/press_releases",
    headers: {
      "Authorization": auth
    }
  }, (response) => {
    let json = "";
    response.on("data", (chunk) => {
      json += chunk;
    });
    response.on("end", function() {
      const section = document.getElementById("news");
      const data = JSON.parse(json);
      for (let i = 0; i < amount; i++) {
        const content = data.data[i];
        let a = createNode("a");
        a.innerHTML = `Article: ${content.title}`;
        a.href = `${content.url}`;
        append(section, a);
      }
    });
  });
  request.end();
}

export default React.createClass({

  componentDidMount() {
    postArticles(5);
  },

  render() {
    return(
      <div id="news"></div>
    );
  }
});
