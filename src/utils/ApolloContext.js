import React from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import firebase from "firebase";

export const ApolloContext = ({ children }) => {
  const authLink = setContext(async (_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `${await firebase.auth().currentUser.getIdToken()}`,
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
