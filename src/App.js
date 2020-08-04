import React from "react";
import {Provider, useSelector} from "react-redux";
import {store} from "./store";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {ApolloProvider} from "@apollo/client";
import {Navbar} from "./components/layout/Navbar";
import {Page} from "./components/layout/Page";
import {Footer} from "./components/layout/Footer";
import styled from 'styled-components'
import {
    BrowserRouter as Router, Switch
} from "react-router-dom";
import {Loading} from "./components/screens/Loading";
import {PrivateRoute} from "./components/utils/PrivateRoute";
import {AuthenticationContext} from "./context/Authentication";

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
            <AuthenticationContext.Provider value={authenticationState}>
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
            </AuthenticationContext.Provider>
        </Provider>
    );
}

export default App;
