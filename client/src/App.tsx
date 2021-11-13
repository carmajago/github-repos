
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import ReactNotification from "react-notifications-component";
import { Dashboard } from "./layout";
import { useGetUserInformation } from "./hooks/useGetUserInformation";
import { Login } from './layout/Login/index';
import { Loader } from "./components/Loader";
import { useEffect } from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { NavBarPrimary } from "./components/NavBar";
import { Register } from "./layout/Register";

function App() {

  const { loading, getProfile } = useGetUserInformation();
  const user = useSelector((store: RootState) => {
    return store.auth;
  });

  useEffect(() => {
    getProfile();
  }, []);


  if (loading) {
    return <Loader></Loader>;
  }


  const token = user["user"] ? user["user"]["access_token_git"] : '';

  const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${token}`,
    }
  });

  return (
    <>
      <ReactNotification />
      <ApolloProvider client={client}>
        <Router>
          <NavBarPrimary></NavBarPrimary>
          <div>
            <Switch>
              <Route exact path="/login">
                <Login></Login>
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>

              <Route path="/" component={Dashboard}></Route>
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
