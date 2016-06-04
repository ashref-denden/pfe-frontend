import React from 'react';
import Reflux from 'reflux';
import SerialActions from '../../actions/serial-actions';
import SerialtStore from '../../stores/serial-store';
import PlatformUserStore from '../../stores/platform-user-store';
import PlatformUserConstants from '../../constants/platform-user-constants';
import { browserHistory, Link } from 'react-router';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

var Product = React.createClass({

  selectedRows: [],

  mixins : [Reflux.listenTo(SerialtStore, 'onChange'), Reflux.listenTo(PlatformUserStore, 'onChange')],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState : function(){
    return {

    }
  },

  componentWillMount: function () {
    if(this.checkPermissions()) {
      SerialActions.getProductSerials(this.props.params.productId);
    }
  },

  uidFormat: function (cell, row){
    if(row.uid === null) {
      return (<span className="label label-warning">Not Associated</span>);
    } else {
      return cell;
    }
  },

  statusFormat: function (cell, row){
    if(row.checkNumb > 1) {
      return (<span className="label label-danger">Counterfieted</span>);
    } else if(row.checkNumb === 1) {
      return (<span className="label label-success">Checked</span>);
    } else {
      return (<span className="label label-info">Not Checked</span>);
    }

  },

  checkNumbFormat: function(cell, row) {
    if(row.checkNumb > 0) {
      return (<Link to={`/checks/` + row.serial}>{cell}</Link>);
    }
  },

  render: function() {
    var serials = [];
    if(JSON.stringify(this.state) !== JSON.stringify({})){
      for(var serial in this.state.serials) {
        serials.push(this.state.serials[serial]);
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

    return (
      <div>
        <div className="row">
          <h1>{this.state.name}</h1>
        </div>
        <hr/>
        <div className="row">
          <p>{this.state.description}</p>
        </div>

        <h2>Product Serial Numbers</h2>
        <hr/>
        <div className="btn-group btn-group-sm" role="group">
          <button type="button" className="btn btn-info react-bs-table-add-btn" data-toggle="modal" data-target=".bs-table-modal-sm18" title="Update serials numbers from ERP system" onClick={this.updateProductSerials}>
            <i className="glyphicon glyphicons-sorting"></i>
            <span> </span>
            <span>Update</span>
          </button>
          <button type="button" className="btn btn-success" data-toggle="modal" data-target=".bs-table-modal-sm18" title="Associate serials numbers with UIDs" onClick={this.associate}>
            <i className="glyphicon glyphicons-link"></i>
            <span> </span>
            <span>Associate</span>
          </button>
          <button type="button" className="btn btn-warning react-bs-table-del-btn" data-toggle="tooltip" data-placement="right" title="Drop selected row" onClick={this.delete}>
            <i className="glyphicon glyphicon-trash"></i>
            <span> </span>
            <span>Delete</span>
          </button>
        </div>

        <BootstrapTable
          data={serials}
          striped={true}
          hover={true}
          condensed={true}
          pagination={true}
          selectRow={selectRowProp}
          search={true}
          options= {tableOptions}
          ref="serials">
          <TableHeaderColumn dataField="id" isKey={true} dataAlign="left" dataSort={true} width="100">Serial ID</TableHeaderColumn>
          <TableHeaderColumn dataField="serial" dataAlign="left" dataSort={true}>Serial</TableHeaderColumn>
          <TableHeaderColumn dataField="uid" dataAlign="left" dataFormat={this.uidFormat} >UID</TableHeaderColumn>
          <TableHeaderColumn dataField="checkNumb" dataAlign="center" dataSort={true} dataFormat={this.checkNumbFormat} width="130">Check Number</TableHeaderColumn>
          <TableHeaderColumn dataAlign="right" dataFormat={this.statusFormat} >Status</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  },

  onChange: function(event, data) {
    switch (event) {
      case 'product_serials':
      this.setState(data);
      break;

      case 'product_serials_updated':
      this.setState(data);
      break;

      case 'serials_associated':
      this.setState(data);
      this.updateSelectedRows();
      break;

      case 'serials_deleted':
      this.updateDeletedRows();
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
      this.selectedRows.push(row);
    } else {
      this.selectedRows.pop(row);
    }
  },

  onSelectAll: function(isSelected){
    if(isSelected) {
      for(var serial in this.state.serials) {
        this.selectedRows.push(this.state.serials[serial]);
      }
    } else {
      for(var product in this.state) {
        this.selectedRows.pop(this.state.serials[serial]);
      }
    }
  },

  updateSelectedRows: function() {
    for(var serial in this.state.serials) {
      for(var row in this.selectedRows) {
        if(this.state.serials[serial].id === this.selectedRows[row].id) {
          this.selectedRows[row].uid = this.state.serials[serial].uid;
        }
      }
    }
  },

  updateDeletedRows: function() {
    var selectedSerials = [];
    for(var row in this.selectedRows) {
      selectedSerials.push(this.selectedRows[row].id);
    }
    //Drop selected rows by key
    this.refs.serials.handleDropRow(selectedSerials);
    this.selectedRows = [];
  },

  handleConfirmDeleteRow: function(next, rowKeys) {
    next();
  },

  updateProductSerials: function() {
    SerialActions.updateProductSerials(this.props.params.productId);
  },

  associate: function() {
    var selectedSerials = [];
    for(var row in this.selectedRows) {
      if(this.selectedRows[row].uid === null) {
        selectedSerials.push(this.selectedRows[row].id);
      }
    }
    if(selectedSerials.length > 0) {
      SerialActions.associate(this.props.params.productId, selectedSerials);
    }
  },

  delete: function() {
    var selectedSerials = [];
    for(var row in this.selectedRows) {
      selectedSerials.push(this.selectedRows[row].id);
    }
    if(selectedSerials.length > 0) {
      SerialActions.delete(this.props.params.productId, selectedSerials);
    }
  }
});

export default Product;
