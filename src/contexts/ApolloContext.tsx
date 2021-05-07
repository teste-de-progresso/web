import React, { FC } from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

type Props = {
  children?: any
  authToken: string
}

export const ApolloContext: FC<Props> = ({ children, authToken }) => {
  const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`
  })

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${authToken}`,
    },
  }))

  const credentialsType = process.env.NODE_ENV === "development" ? "same-origin" : "include"

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    credentials: credentialsType,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
