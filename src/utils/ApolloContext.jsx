import React from "react";
import { useSelector } from "react-redux";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export const ApolloContext = ({ children }) => {
  const authenticationState = useSelector((state) => state.auth);

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_BACKEND_URL || "http://localhost:3001",
  });

  const authLink = setContext((_, { headers }) => {
    const { token } = authenticationState;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const credentialsType = () => {
    if (process.env.NODE_ENV === "development") {
      return "same-origin";
    }
    return "include";
  };

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    credentials: credentialsType(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
