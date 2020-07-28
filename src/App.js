import React from 'react';
import {Provider, useSelector} from "react-redux";

import {
    BrowserRouter as Router, Link, Route, Switch
} from "react-router-dom";
import {Navbar} from "./components/layout/Navbar";
import styled from 'styled-components'
import {Page} from "./components/layout/Page";
import {Footer} from "./components/layout/Footer";
import {Login} from "./components/screens/Login";
import {PrivateRoute} from "./components/utils/PrivateRoute";
import {AuthenticationContext} from "./context/Authentication";
import {Loading} from "./components/screens/Loading";
import {Button} from "./components/widgets/Button";

const Layout = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
`

function App() {
    const authenticationState = useSelector(state => state.auth);

    if (authenticationState.isLoading) {
        return <Loading/>
    }

    return (
        <AuthenticationContext.Provider value={authenticationState}>
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
        </AuthenticationContext.Provider>
    );
}

export default App;
