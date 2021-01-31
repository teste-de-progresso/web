import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { store } from "./store";
import { ApolloContext, UserContextProvider } from "./utils";
import { Login } from "./screens";
import { AuthenticationContext } from "./utils/contexts";
import { loadAuthentication } from "./store/ducks/auth/actions";
import Routes from "./Routes";

function App() {
  const authenticationState = useSelector((state) => state.auth);

  useEffect(() => {
    store.dispatch(loadAuthentication());
  }, []);

  if (!authenticationState.isLoggedIn) return <Login />;

  return (
    <AuthenticationContext.Provider value={authenticationState}>
      <ApolloContext>
        <UserContextProvider>
          <Routes />
        </UserContextProvider>
      </ApolloContext>
    </AuthenticationContext.Provider>
  );
}

export default App;
