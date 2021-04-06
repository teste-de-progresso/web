import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "fontsource-roboto";

import "./styles/global.css";
import "./styles/main.css";
import "./styles/ckeditor-content-styles.css";

import App from "./App";
import { store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
