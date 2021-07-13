import React from "react";
import { FirebaseAuthConsumer } from "@react-firebase/auth";

import { ApolloContext, UserContext, FirebaseProvider } from "./contexts";
import { PrivateRoutes, PublicRoutes } from "./routes";
import { Appbar } from "./components";

export const App = () => {
  return (
    <FirebaseProvider>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user }) => {
          if (isSignedIn) {
            return (
              <ApolloContext authToken={user.Aa}>
                <UserContext authToken={user.Aa}>
                  <Appbar />
                  <PrivateRoutes />
                </UserContext>
              </ApolloContext>
            )
          } else {
            return <PublicRoutes />
          }
        }}
      </FirebaseAuthConsumer>
    </FirebaseProvider >
  );
}

export default App;
