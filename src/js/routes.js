import React from 'react';
import { hashHistory , Router, Route, IndexRoute} from 'react-router';
import App from './components/App';
import SearchPanel from './components/SearchPanel';
import AddProduct from './components/manufacturer/AddProduct';
import LinkERP from './components/manufacturer/LinkERP';
import SignIn from './components/platform-user/SignIn';
import EditProfile from './components/platform-user/EditProfile';
import Products from './components/manufacturer/Products';
import Product from './components/manufacturer/Product';
import Checks from './components/manufacturer/Checks';

var Routes = (
  <Router history={hashHistory }>
    <Route path="/" component={App} >
      <IndexRoute component={SearchPanel} />
      <Route path="/addProduct" component={AddProduct}/>
      <Route path="/LinkERP" component={LinkERP}/>
      <Route path="/signIn/:isManufacturer" component={SignIn} />
      <Route path="/editProfile" component={EditProfile} />
      <Route path="/products" component={Products} />
      <Route path="/product/:productId" component={Product} />
      <Route path="/checks/:serial" component={Checks} />
    </Route>
  </Router>
);

export default Routes;
