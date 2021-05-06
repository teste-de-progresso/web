import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { store } from "./store";
import { ApolloContext, UserContext } from "./contexts";
import { loadAuthentication } from "./store/ducks/auth/actions";
import { PrivateRoutes, PublicRoutes } from "./routes";

function App() {
  const authenticationState = useSelector((state: any) => state.auth);

  useEffect(() => {
    store.dispatch(loadAuthentication());
  }, []);

  if (!authenticationState.isLoggedIn) return <PublicRoutes />;

  return (
    <ApolloContext authToken={authenticationState.token as string}>
      <UserContext>
        <PrivateRoutes />
      </UserContext>
    </ApolloContext>
  );
}

export default App;
