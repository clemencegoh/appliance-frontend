import React from "react";

import { Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import SnackbarContainer from "core/components/Snackbar";
import AppliancePage from "appliances/AppliancePage";

// Router
import { createHashHistory as createBrowserHistory } from "history";
import DevelopmentPage from "dev/Dev";

export const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/dev">
          <DevelopmentPage />
        </Route>
        <Route path="/">
          <AppliancePage />
        </Route>
      </Switch>
      <SnackbarContainer />
    </div>
  );
}

export default App;
