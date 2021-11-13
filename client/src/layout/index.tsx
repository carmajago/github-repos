import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { LoginGitHub } from "./Home/LoginGitHub";
import { Repositories } from "./Repositories/index";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const Dashboard = () => {


  const user = useSelector((store: RootState) => {
    return store.auth;
  });

  if (Object.keys(user["user"]).length === 0) {
    return <Redirect to="/login"></Redirect>
  }

  return (
    <div className="main-container">
      <div className="main-content">
        <Container>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/">
                <LoginGitHub />
              </Route>

              <Route exact path="/home">
                <Repositories />
              </Route>

            </Switch>
          </Suspense>
        </Container>
      </div>
    </div>
  );
};
