import React, { useState } from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import firebase from "firebase";

export const ApolloContext = ({ children }) => {
  const [jwtToken, setJwtToken] = useState();
  firebase.auth().currentUser.getIdToken().then((token) => setJwtToken(token));

  if (!jwtToken) return <div />;

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: jwtToken,
    },
  })).concat(createHttpLink({
    uri: process.env.REACT_APP_BACKEND_URL,
  }));

  const credentialsType = () => {
    if (process.env.NODE_ENV === "development") {
      return "same-origin";
    }
    return "include";
  };

  const client = new ApolloClient({
    link: authLink,
    cache: new InMemoryCache(),
    credentials: credentialsType(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
