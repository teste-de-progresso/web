import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "./services/store";
import { ApolloContext, UserContext } from "./contexts";
import { PrivateRoutes, PublicRoutes } from "./Routes";
import { loadSession } from "./services/store/auth";
import { Appbar } from "./components";

export const App = () => {
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSession())
  }, [dispatch]);

  if (!auth.token) return <PublicRoutes />;

  return (
    <ApolloContext authToken={auth.token}>
      <UserContext>
        <Appbar />
        <PrivateRoutes />
      </UserContext>
    </ApolloContext>
  );
}

export default App;
