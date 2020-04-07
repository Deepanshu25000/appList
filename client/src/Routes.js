import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import AppList from "./components/AppList";
import AppDetails from "./components/AppDetails";

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={AppList} />
        <Route path="/appdetails/:appId" component={AppDetails} />
      </Switch>
    </Router>
  );
}

export default Routes;
