import React from "react";
import ReactDOM from "react-dom";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { FirebaseProvider } from "./utils";
import { UnAuthed } from "./screens/UnAuthed";

import App from "./App";
import "fontsource-roboto";

import "./styles/global.css";
import "./styles/main.css";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      <FirebaseAuthConsumer>
        {({ isSignedIn }) => {
          if (isSignedIn) {
            return (<App />);
          }
          return <UnAuthed />;
        }}
      </FirebaseAuthConsumer>
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
