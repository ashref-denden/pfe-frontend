import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App';
import ProductCheckInput from './components/ProductCheckInput';
import Page from './components/Page';
var Routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ProductCheckInput} />
      <Route path="/page" component={Page}/>
    </Route>
    <Route path="/about" component={Page} />
  </Router>

);

export default Routes;
