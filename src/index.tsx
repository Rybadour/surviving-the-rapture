import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

library.add(faEyeSlash, faEye);
dom.watch();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);

if (module && module.hot && module.hot.accept) {
  module.hot.accept();
}
