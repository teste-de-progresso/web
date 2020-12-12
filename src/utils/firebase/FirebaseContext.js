import React from "react";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import FirebaseProvider from "./FirebaseProvider";
import { UnAuthed } from "../../screens";

export const FirebaseContext = ({ children }) => (
  <FirebaseProvider>
    <FirebaseAuthConsumer>
      {({ isSignedIn }) => {
        if (isSignedIn) {
          return children;
        }
        return <UnAuthed />;
      }}
    </FirebaseAuthConsumer>
  </FirebaseProvider>
);
