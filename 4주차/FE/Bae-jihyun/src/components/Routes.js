import React, { useEffect } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import Feed from "./Feed";

function Routes() {
  let isAuthorized = sessionStorage.getItem("isAuthorized");

  if (!isAuthorized)
    return (
      <>
        <Redirect to="/login" />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/feed" component={Feed} />
        </Switch>
      </>
    );
  if (isAuthorized)
    return (
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/feed" component={Feed} />
        </Switch>
      </>
    );
}

export default Routes;
