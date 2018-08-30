import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import Index from "./routes/Index";
import ShowInfo from './routes/ShowInfo';
import Login from './routes/Login';
import Register from "./routes/Register";
import Admin from './routes/Admin';
import ShareView from "./routes/ShareView";


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/showinfo" exact component={ShowInfo} />
        <Route path="/login" exact component={Login} />
        <Route path="/reg" exact component={Register} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/share/" strict component={ShareView} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
