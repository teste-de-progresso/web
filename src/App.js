import React from 'react';
import {Provider} from "react-redux";
import {store} from "./store";
import {
    BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import {Navbar} from "./components/layout/Navbar";
import styled from 'styled-components'
import {Page} from "./components/layout/Page";
import {Footer} from "./components/layout/Footer";
import {Login} from "./components/screens/Login";

const Layout = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
`

function App() {
  return (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path={"/login"}>
                    <Login/>
                </Route>
                <Route path={"/"}>
                    <Layout className="h-screen">
                        <Navbar/>
                        <Page/>
                        <Footer/>
                    </Layout>
                </Route>
            </Switch>
        </Router>
    </Provider>
  );
}

export default App;
