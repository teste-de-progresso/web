import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { store } from "./store";
import { ApolloContext, UserContextProvider } from "./utils";
import { AuthenticationContext } from "./utils/contexts";
import { loadAuthentication } from "./store/ducks/auth/actions";
import { PrivateRoutes, PublicRoutes } from "./routes";

function App() {
  const authenticationState = useSelector((state: any) => state.auth);

  useEffect(() => {
    store.dispatch(loadAuthentication());
  }, []);

  if (!authenticationState.isLoggedIn) return <PublicRoutes />;

  return (
    <AuthenticationContext.Provider value={authenticationState}>
      <ApolloContext>
        <UserContextProvider>
          <PrivateRoutes />
        </UserContextProvider>
      </ApolloContext>
    </AuthenticationContext.Provider>
  );
}

export default App;
