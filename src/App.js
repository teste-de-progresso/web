import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import styled from 'styled-components'
import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import { Footer, Navbar } from "./components/layout"
import { Home } from "./components/screens/home"
import { New, Edit, Show } from "./components/screens/questions"
import { Loading } from "./components/screens/Loading";
import { AuthenticationContext } from "./context/Authentication";
import { loadAuthentication } from "./store/ducks/auth/actions";
import { Login } from "./components/screens/Login"

const client = new ApolloClient({
    uri: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001',
    cache: new InMemoryCache(),
});

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

function App() {
    const authenticationState = useSelector(state => state.auth);

    useEffect(() => {
        store.dispatch(loadAuthentication())
    }, []);

    if (authenticationState.isLoading) {
        return <Loading />
    }

    if (!authenticationState.isLoggedIn) {
        return <Login />
    }

    return (
        <Provider store={store}>
            <AuthenticationContext.Provider value={authenticationState}>
                <ApolloProvider client={client}>
                    <Router>
                        <Switch>
                            <Layout className="h-screen">
                                <Navbar />
                                <Route exact path={"/"} component={Home} />
                                <Route exact path={"/question/new"} component={New} />
                                <Route exact path={"/question/:id/edit"} component={Edit} />
                                <Route exact path={"/question/:id/show"} component={Show} />
                                <Footer />
                            </Layout>
                        </Switch>
                    </Router>
                </ApolloProvider>
            </AuthenticationContext.Provider>
        </Provider>
    );
}

export default App;
