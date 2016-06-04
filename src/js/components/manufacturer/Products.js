import React from 'react';
import Reflux from 'reflux';
import ProductActions from '../../actions/product-actions';
import ProductStore from '../../stores/product-store';
import PlatformUserStore from '../../stores/platform-user-store';
import PlatformUserConstants from '../../constants/platform-user-constants';
import { browserHistory, Link } from 'react-router';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

var Products = React.createClass({

  selectedRows: [],

  mixins : [Reflux.listenTo(ProductStore, 'onChange'), Reflux.listenTo(PlatformUserStore, 'onChange')],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState : function(){
    return {

    }
  },

  componentWillMount: function () {
    if(this.checkPermissions()) {
      ProductActions.getManufacturerProducts(PlatformUserStore.getUser().username);
    }
  },

  format: function (cell, row){
    return (<Link to={`/product/` + row.id}>serials</Link>);
  },

  render: function() {
    var products = [];
    if(JSON.stringify(this.state) !== JSON.stringify({})){
      for(var product in this.state) {
        products.push(this.state[product]);
      }
    }
    //Row select setting
    var selectRowProp = {
      mode: "checkbox",  //checkbox for multi select, radio for single select.
      clickToSelect: true,   //click row will trigger a selection on that row.
      bgColor: "rgb(238, 193, 213)",
      onSelect: this.onRowSelect,   //selected row background color
      onSelectAll: this.onSelectAll
    };

    var tableOptions = {
      handleConfirmDeleteRow: this.handleConfirmDeleteRow
    };

    var user = PlatformUserStore.getUser();

    var linkERP = "Link ERP";

    if(user.erpLinked) {
      linkERP = "Edit ERP";
    }

    return (
      <div>
        <h2>Product List</h2>
        <hr/>
        <div className="btn-group btn-group-sm" role="group">
          <button type="button" className="btn btn-info react-bs-table-add-btn" data-toggle="modal" data-target=".bs-table-modal-sm18" title="Add a new row" onClick={this.addProduct}>
            <i className="glyphicon glyphicon-plus"></i>
            <span> </span>
            <span>New</span>
          </button>
          <button type="button" className="btn btn-success react-bs-table-add-btn" data-toggle="modal" data-target=".bs-table-modal-sm18" title="Link to ERP System" onClick={this.linkERP}>
            <i className="glyphicon glyphicon-link"></i>
            <span> </span>
            <span>{linkERP}</span>
          </button>
          <button type="button" className="btn btn-warning react-bs-table-del-btn" data-toggle="tooltip" data-placement="right" title="Drop selected row" onClick={this.deleteProducts}>
            <i className="glyphicon glyphicon-trash"></i>
            <span> </span>
            <span>Delete</span>
          </button>
        </div>

        <BootstrapTable
          data={products}
          striped={true}
          hover={true}
          condensed={true}
          pagination={true}
          selectRow={selectRowProp}
          search={true} options= {tableOptions} ref="products">
          <TableHeaderColumn dataField="id" isKey={true} dataAlign="right" dataSort={true}>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField="name" dataSort={true}>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataAlign="center" dataFormat={this.format} >Product Serials Numbers</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  },

  onChange: function(event, data) {
    switch (event) {
      case 'manufacturer_products':
      this.setState(data);
      break;

      case 'products_deleted':
      //Drop selected rows by key
      this.refs.products.handleDropRow(this.selectedRows);
      this.selectedRows = [];
      break;

      case 'user_logout':
      this.context.router.push('/');
      break;

      default:
    }
  },

  checkPermissions: function() {
    var user = PlatformUserStore.getUser();
    var hasNoPermissions = !user || user.role !== PlatformUserConstants.role.manufacturer
    if(hasNoPermissions) {
      this.context.router.push('/');
    }
    return !hasNoPermissions;
  },

  onRowSelect: function(row, isSelected) {
    if(isSelected) {
      this.selectedRows.push(row.id);
    } else {
      this.selectedRows.pop(row.id);
    }
  },

  onSelectAll: function(isSelected){
    if(isSelected) {
      for(var product in this.state) {
        this.selectedRows.push(this.state[product].id);
      }
    } else {
      for(var product in this.state) {
        this.selectedRows.pop(this.state[product].id);
      }
    }
  },

  handleConfirmDeleteRow: function(next, rowKeys) {
    next();
  },

  addProduct: function() {
    this.context.router.push('/addProduct');
  },

  linkERP: function() {
    this.context.router.push('/linkERP');
  },

  deleteProducts: function() {
    if(this.selectedRows.length > 0) {
      var user = PlatformUserStore.getUser();
      ProductActions.deleteManufacturerProducts(user.username, this.selectedRows);
    }
  }
});

export default Products;
