import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { Home } from "./components/screens/home"
import { New, Edit, Show } from "./components/screens/questions"
import styled from 'styled-components'
import {
    BrowserRouter as Router, Switch
} from "react-router-dom";
import { Loading } from "./components/screens/Loading";
import { PrivateRoute } from "./components/utils/PrivateRoute";
import { AuthenticationContext } from "./context/Authentication";
import { loadAuthentication } from "./store/ducks/auth/actions";

const client = new ApolloClient({
    uri: process.env.REACT_APP_BACKEND_URL,
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

    return (
        <Provider store={store}>
            <AuthenticationContext.Provider value={authenticationState}>
                <ApolloProvider client={client}>
                    <Router>
                        <Switch>
                            <Layout className="h-screen">
                                <PrivateRoute exact path={"/"} component={Home} />
                                <PrivateRoute exact path={"/question/new"} component={New} />
                                <PrivateRoute exact path={"/question/:id/edit"} component={Edit} />
                                <PrivateRoute exect path={"/question/:id/show"} component={Show} />
                            </Layout>
                        </Switch>
                    </Router>
                </ApolloProvider>
            </AuthenticationContext.Provider>
        </Provider>
    );
}

export default App;
