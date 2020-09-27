import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Admin from './modules/Admin';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Redirect from="/" to="/cards/catalogue" />
      <Route path="/cards" component={App} />
      <Route path="/admin" component={Admin} />
      {/* <Route path="/admin" component={Admin} /> */}
      {/* <Route component={NotFound} /> */}
    </Switch>
  </BrowserRouter>
);

export default Router;