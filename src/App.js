import React from "react";
import { ApolloContext, UserContext, FirebaseContext } from "./utils";
import Routes from "./Routes";

const App = () => (
  <FirebaseContext>
    <ApolloContext>
      <UserContext>
        <Routes />
      </UserContext>
    </ApolloContext>
  </FirebaseContext>
);

export default App;
