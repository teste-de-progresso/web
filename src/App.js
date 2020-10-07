import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import styled from 'styled-components'
import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom";

import { ApolloContext, UserContextProvider } from "./components/utils"

import { Navbar } from "./components/layout"
import { Home } from "./components/screens/home"
import { New, Edit, Show } from "./components/screens/questions"
import { Loading } from "./components/screens/Loading";
import { AuthenticationContext } from "./context/Authentication";
import { loadAuthentication } from "./store/ducks/auth/actions";
import { Login, UserProfile } from "./components/screens"

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

function App() {
    const authenticationState = useSelector(state => state.auth);

    useEffect(() => {
        store.dispatch(loadAuthentication())
    }, []);

    if (authenticationState.isLoading) return <Loading />
    if (!authenticationState.isLoggedIn) return <Login />

    return (
        <Provider store={store}>
            <AuthenticationContext.Provider value={authenticationState}>
                <ApolloContext>
                    <UserContextProvider>
                        <Router>
                            <Switch>
                                <Layout className="h-screen">
                                    <Navbar />
                                    <Route exact path={"/"} component={Home} />
                                    <Route exact path={"/question/new"} component={New} />
                                    <Route exact path={"/question/:id/edit"} component={Edit} />
                                    <Route exact path={"/question/:id/show"} component={Show} />
                                    <Route exact path={"/user/profile"} component={UserProfile} />
                                </Layout>
                            </Switch>
                        </Router>
                    </UserContextProvider>
                </ApolloContext>
            </AuthenticationContext.Provider>
        </Provider>
    );
}

export default App;
