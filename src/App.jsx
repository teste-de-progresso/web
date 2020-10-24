import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { store } from './store';

import { ApolloContext, UserContextProvider } from './utils';

import { Navbar } from './components';
import { Home, Login, UserProfile } from './screens';
import {
  New, Edit, Show, Review,
} from './screens/questions';
import { Loading } from './screens/Loading';
import { AuthenticationContext } from './utils/contexts';
import { loadAuthentication } from './store/ducks/auth/actions';

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

function App() {
  const authenticationState = useSelector((state) => state.auth);

  useEffect(() => {
    store.dispatch(loadAuthentication());
  }, []);

  if (authenticationState.isLoading) return <Loading />;
  if (!authenticationState.isLoggedIn) return <Login />;

  return (
    <Provider store={store}>
      <AuthenticationContext.Provider value={authenticationState}>
        <ApolloContext>
          <UserContextProvider>
            <Router>
              <Switch>
                <Layout className="h-screen">
                  <Navbar />
                  <Route exact path="/" component={Home} />
                  <Route exact path="/question/new" component={New} />
                  <Route exact path="/question/:id/edit" component={Edit} />
                  <Route exact path="/question/:id/show" component={Show} />
                  <Route exact path="/question/:id/review" component={Review} />
                  <Route exact path="/user/profile" component={UserProfile} />
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
