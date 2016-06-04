import React from 'react';
import Reflux from 'reflux';
import ReactDOM from 'react-dom';
import ProductStore from '../../stores/product-store';
import PlatformUserStore from '../../stores/platform-user-store';
import PlatformUserConstants from '../../constants/platform-user-constants';
import PlatformUserActions from '../../actions/platform-user-actions';
import { browserHistory } from 'react-router';

var LinkERP = React.createClass({

  mixins : [Reflux.listenTo(ProductStore, 'onChange'), , Reflux.listenTo(PlatformUserStore, 'onChange')],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState : function(){
    return {
      url: "",
      databaseName: "",
      dbUsername: "",
      dbPassword: ""

    }
  },

  componentWillMount: function () {
    if(this.checkPermissions()) {
      var user = PlatformUserStore.getUser();
      if(user.erpLinked) {
        PlatformUserActions.getERP(user.userId);
      }
    }

  },

  render: function(){
    return (
      <div>
      <form className="form-horizontal">
      <h2>Link ERP System</h2>
      <hr/>

      <fieldset>
        <div className="row">
          <div className="form-group">
            <label className="col-md-3 control-label" htmlFor="url">URL</label>
            <div className="col-md-6">
              <input id="url" name="url" type="text"
              placeholder="ERP system server URL" className="form-control input-md"
              ref="url" value={this.state.url} onChange={this.onFormInputChange} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label className="col-md-3 control-label" htmlFor="databaseName">Database</label>
            <div className="col-md-6">
              <input id="databaseName" name="databaseName" type="text"
              placeholder="ERP system database name" className="form-control input-md"
              ref="databaseName" value={this.state.databaseName} onChange={this.onFormInputChange} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label className="col-md-3 control-label" htmlFor="dbUsername">User Name</label>
            <div className="col-md-6">
              <input id="dbUsername" name="dbUsername" type="text"
              placeholder="ERP system database user name" className="form-control input-md"
              ref="dbUsername" value={this.state.dbUsername} onChange={this.onFormInputChange} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label className="col-md-3 control-label" htmlFor="dbPassword">Password</label>
            <div className="col-md-6">
              <input id="dbPassword" name="dbPassword" type="text"
              placeholder="ERP system database user password" className="form-control input-md"
              ref="dbPassword" value={this.state.dbPassword} onChange={this.onFormInputChange} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <div className="col-md-9">
              <button type="button" className="btn btn-primary pull-right" onClick={this.link}>Link</button>
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
      url: ReactDOM.findDOMNode(this.refs.url).value,
      databaseName: ReactDOM.findDOMNode(this.refs.databaseName).value,
      dbUsername: ReactDOM.findDOMNode(this.refs.dbUsername).value,
      dbPassword: ReactDOM.findDOMNode(this.refs.dbPassword).value
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

  link : function(){
    PlatformUserActions.linkERP(this.state);
  },

  onChange: function(event, data) {
    switch (event) {
      case 'user_logout':
      this.context.router.push('/');
      break;

      case 'erp_linked':
      this.context.router.push('/');
      break;

      case 'erp_not_linked':
      break;

      case 'erp':
      this.setState(data);
      break;

      default:
    }
  }

});

export default LinkERP;
