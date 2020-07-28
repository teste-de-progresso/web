import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import styled from "styled-components";

import { Navbar } from "./components/layout/Navbar";
import { Page } from "./components/layout/Page";
import { Footer } from "./components/layout/Footer";
import { Login } from "./components/screens/Login";

import React from 'react';
import {Provider} from "react-redux";

import {Navbar} from "./components/layout/Navbar";
import styled from 'styled-components'
import {Page} from "./components/layout/Page";
import {Footer} from "./components/layout/Footer";
import {Login} from "./components/screens/Login";

import {
  BrowserRouter as Router, Link, Route, Switch
} from "react-router-dom";

const client = new ApolloClient({
  uri: process.env.BACKEND_URL,
  cache: new InMemoryCache(),
});

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

function App() {
  const authenticationState = useSelector(state => state.auth);

  if (authenticationState.isLoading) {
      return <Loading/>
  }

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
            <Router>
                <Switch>
                    <PrivateRoute exact path={"/"}>
                        <Layout className="h-screen">
                            <Navbar/>
                            <Page/>
                            <Footer/>
                        </Layout>
                    </PrivateRoute>
                </Switch>
            </Router>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
