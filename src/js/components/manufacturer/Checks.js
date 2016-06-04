import React from 'react';
import Reflux from 'reflux';
import SerialActions from '../../actions/serial-actions';
import SerialStore from '../../stores/serial-store';
import PlatformUserStore from '../../stores/platform-user-store';
import PlatformUserConstants from '../../constants/platform-user-constants';
import { browserHistory, Link } from 'react-router';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

var Checks = React.createClass({

  mixins : [Reflux.listenTo(PlatformUserStore, 'onChange'), Reflux.listenTo(SerialStore, 'onChange')],


  getInitialState : function(){
    return {

    }
  },

  componentWillMount: function () {
    if(this.checkPermissions()) {
      SerialActions.getSerialChecks(this.props.params.serial);
    }
  },

  render: function() {
    var checks = [];
    if(JSON.stringify(this.state) !== JSON.stringify({})){
      for(var check in this.state) {
        checks.push(this.state[check]);
      }
    }

    return (
      <div>
        <h2>Serial Checks: {this.props.params.serial}</h2>
        <hr/>
        <BootstrapTable
          data={checks}
          striped={true}
          hover={true}
          condensed={true}
          pagination={true}
          ref="checks">
          <TableHeaderColumn dataField="id" isKey={true} dataAlign="left" dataSort={true} width="100">Check ID</TableHeaderColumn>
          <TableHeaderColumn dataField="destination" dataAlign="center">Destined Market</TableHeaderColumn>
          <TableHeaderColumn dataField="location" dataAlign="center" dataFormat={this.locationformat}>Check Location</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  },

  onChange: function(event, data) {
    switch (event) {
      case 'serial_checks':
      this.setState(data);
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

  locationformat: function(cell, row) {
    if(row.destination != row.location) {
      return (<span className="label label-danger">{cell}</span>);
    } else {
      return (<span className="label label-success">{cell}</span>);
    }

  }

});

export default Checks;
