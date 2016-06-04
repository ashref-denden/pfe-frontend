import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import PlatformUserStore from '../../stores/platform-user-store';
import PlatformUserActions from '../../actions/platform-user-actions';
import PlatformUserConstants from '../../constants/platform-user-constants';

var EditProfile = React.createClass({

  mixins : [Reflux.listenTo(PlatformUserStore, 'onChange')],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState : function() {
    return PlatformUserStore.getUser();
  },

  componentWillMount: function() {
    this.checkPermissions();
  },

  render: function() {
    var user  =  PlatformUserStore.getUser();
    var companyName = "";
    if(user.role === PlatformUserConstants.role.manufacturer) {
      companyName = (
        <div className="row">
          <div className="form-group">
            <label className="col-md-3 control-label" htmlFor="inputCompanyName">Company Name</label>
            <div className="col-md-6">
              <input id="companyName" name="companyName" type="text"
              placeholder=">Company Name" className="form-control input-md"
              ref="companyName" value={this.state.companyName} onChange={this.onFormInputChange} />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
      <form className="form-horizontal">
      <h2>Edit Profile</h2>
      <hr/>

      <fieldset>
        <div className="row">
          <div className="form-group">
            <label className="col-md-3 control-label" htmlFor="username">Name</label>
            <div className="col-md-6">
              <input id="username" name="username" type="text"
              placeholder="User Name" className="form-control input-md"
              ref="username" value={this.state.username} onChange={this.onFormInputChange} />
            </div>
          </div>
        </div>

      {companyName}

        <div className="row">
          <div className="form-group">
            <div className="col-md-9">
              <button type="button" className="btn btn-primary pull-right" onClick={this.editProfile}>Edit</button>
            </div>
          </div>
        </div>
      </fieldset>
      </form>
      </div>
    );
  },

  editProfile: function() {
    PlatformUserActions.editProfile(this.state);
  },

  onChange: function(event, data) {
    switch (event) {

      case "edit_success":
      this.context.router.push('/');
      break;

      default:
    }
  },

  onFromInputChange: function() {
    this.setState({
        username: ReactDOM.findDOMNode(this.refs.username).value,
        companyName: this.state.role === PlatformUserConstants.role.manufacturer ? ReactDOM.findDOMNode(this.refs.companyName).value : ""
    });
  },

  checkPermissions: function() {
    var user = PlatformUserStore.getUser();
    var hasPermissions = user && user.role !== "";
    if(!hasPermissions) {
      this.context.router.push('/');
    }
    return hasPermissions;
  }

});

export default EditProfile;
