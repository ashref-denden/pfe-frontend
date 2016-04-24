import React from 'react';
import Reflux from 'reflux';
import ReactDOM from 'react-dom';
import ProductStore from '../../stores/product-store';
import ProductActions from '../../actions/product-actions';
import { browserHistory } from 'react-router';

var AddProduct = React.createClass({

  mixins : [Reflux.listenTo(ProductStore, 'onChange')],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState : function(){
    return {
      name: "",
      description: "",
      serialNumber: ''
    }
  },

  render: function(){
    return (
      <div>
      <hr />
      <form className="form-horizontal">
      <h2>Add new Product</h2>
      <hr/>
      <fieldset>

        <div className="form-group">
          <label className="col-md-3 control-label" htmlFor="name">Name</label>
          <div className="col-md-6">
            <input id="name" name="name" type="text" placeholder="product name" className="form-control input-md" ref="name" value={this.state.name} onChange={this.onFormInputChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-3 control-label" htmlFor="description">Description</label>
          <div className="col-md-6">
          <textarea name="description" id="description" rows="10" placeholder="Description" className="form-control" ref="description" value={this.state.description} onChange={this.onFromInputChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-3 control-label" htmlFor="serialNumber">Serial Number</label>
          <div className="col-md-6">
          <input id="serialNumber" name="serialNumber" type="text" placeholder="product serial number" className="form-control input-md" ref="serialNumber" value={this.state.serialNumber} onChange={this.onFormInputChange} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-6">
            <button type="button" className="btn btn-primary" onClick={this.add}>Add</button>
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
      description: ReactDOM.findDOMNode(this.refs.description).value,
      serialNumber: ReactDOM.findDOMNode(this.refs.serialNumber).value
    })
  },

  add : function(){
    console.log("adding a product");
    ProductActions.addProduct(this.state);
  },

  onChange: function(event) {
    switch (event) {
      case 'interestAdded':
      this.context.router.push('/');
      break;

      default:
    }
  }

});

export default AddProduct;
