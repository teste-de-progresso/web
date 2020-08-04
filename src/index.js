import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/main.css';
import {store} from "./store";
import {Provider} from "react-redux";
import {AuthenticationContext} from "./context/Authentication";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);