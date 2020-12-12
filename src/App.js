import React from "react";
import {
  ApolloContext, ThemeProvider, UserContext, FirebaseContext,
} from "./utils";
import Routes from "./Routes";

const App = () => (
  <FirebaseContext>
    <ApolloContext>
      <UserContext>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </UserContext>
    </ApolloContext>
  </FirebaseContext>
);

export default App;
