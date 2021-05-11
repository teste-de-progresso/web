import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "fontsource-roboto";
import "./styles/global.css";
import "./styles/main.css";
import "./styles/ckeditor-content-styles.css";

import { App } from "./App";
import { store } from "./services/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
