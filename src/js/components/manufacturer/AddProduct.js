import React from 'react';
import Reflux from 'reflux';
import ReactDOM from 'react-dom';
import ProductStore from '../../stores/product-store';
import PlatformUserStore from '../../stores/platform-user-store';
import PlatformUserConstants from '../../constants/platform-user-constants';
import ProductActions from '../../actions/product-actions';
import { browserHistory } from 'react-router';

var AddProduct = React.createClass({

  mixins : [Reflux.listenTo(ProductStore, 'onChange'), , Reflux.listenTo(PlatformUserStore, 'onChange')],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState : function(){
    return {
      name: "",
      description: "",
      manufacturer: ""

    }
  },

  componentWillMount: function () {
    this.checkPermissions();
  },

  render: function(){
    return (
      <div>
      <form className="form-horizontal">
      <h2>Add new Product</h2>
      <hr/>

      <fieldset>
        <div className="row">
          <div className="form-group">
            <label className="col-md-3 control-label" htmlFor="name">Name</label>
            <div className="col-md-6">
              <input id="name" name="name" type="text"
              placeholder="product name" className="form-control input-md"
              ref="name" value={this.state.name} onChange={this.onFormInputChange} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label className="col-md-3 control-label" htmlFor="description">Description</label>
            <div className="col-md-6">
            <textarea name="description" id="description" rows="10"
            placeholder="Description" className="form-control input-md"
            ref="description" value={this.state.description} onChange={this.onFormInputChange} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <div className="col-md-9">
              <button type="button" className="btn btn-primary pull-right" onClick={this.add}>Add</button>
            </div>
          </div>
        </div>
      </fieldset>
      </form>
      </div>
    );
  },

  onFormInputChange : function(){
    this.setState({
      name: ReactDOM.findDOMNode(this.refs.name).value,
      description: ReactDOM.findDOMNode(this.refs.description).value
    })
  },

  checkPermissions: function() {
    var hasPermissions = true;
    var user = PlatformUserStore.getUser();
    var hasNoPermissions = !user || user.role !== PlatformUserConstants.role.manufacturer
    if(hasNoPermissions) {
      hasPermissions = false;
      this.context.router.push('/');
    }
    return hasPermissions;
  },

  add : function(){
    this.state.manufacturer = PlatformUserStore.getUser().username;
    ProductActions.addProduct(this.state);
  },

  onChange: function(event, data) {
    switch (event) {
      case "product_added":
      this.context.router.push('/products');
      break;

      case 'user_logout':
      this.context.router.push('/');
      break;

      default:
    }
  }

});

export default AddProduct;
