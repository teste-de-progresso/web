import React from "react";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { ApolloContext, UserContext, FirebaseProvider } from "./utils";
import Routes from "./Routes";

import { UnAuthed } from "./screens";

const App = () => (
  <FirebaseContext>
    <ApolloContext>
      <UserContext>
        <Routes />
      </UserContext>
    </ApolloContext>
  </FirebaseContext>
);

const FirebaseContext = ({ children }) => (
  <FirebaseProvider>
    <FirebaseAuthConsumer>
      {({ isSignedIn }) => {
        if (isSignedIn) {
          return (children);
        }
        return <UnAuthed />;
      }}
    </FirebaseAuthConsumer>
  </FirebaseProvider>
);

export default App;
