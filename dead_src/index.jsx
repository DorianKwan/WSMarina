import React from "react";
import routes from "./routes.jsx";
import {render} from "react-dom";
import {Router, browserHistory} from "react-router";

render(
  <Router routes={routes} history={browserHistory}/>, document.getElementById("app")
);
