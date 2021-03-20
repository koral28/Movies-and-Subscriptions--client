import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginComp from "./LoginComp";
import CreateAccountComp from "./CreateAccountComp";
import MainComp from "./MainComp";

import { SessionContextProvider } from "./context";

const Login = (props) => {
  return (
    <div>
      <SessionContextProvider>
        <Switch>
          <Route exact path="/" component={LoginComp} />
          <Route path="/createAccount" component={CreateAccountComp} />
          <Route path="/main" component={MainComp} />
        </Switch>
      </SessionContextProvider>
    </div>
  );
};

export default Login;
