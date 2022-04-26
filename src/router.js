import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';
import Todo from './routes/Todo/Todo';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Todo} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
