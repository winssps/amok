import React from 'react';
import { Router, Route, Switch } from 'dva/router';


import GetGroups from './routes/GetGroups';
import ShowInfo from './routes/ShowInfo';
import Login from './routes/Login';




const admin = () => {
  return (
    <p>hello admin</p>
  );
};



function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={GetGroups} />
        <Route path="/showinfo" exact component={ShowInfo} />
        <Route path="/login" exact component={Login} />
        <Route path="/admin" exact component={admin} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
