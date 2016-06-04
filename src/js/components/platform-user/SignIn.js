import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import PlatformUserStore from '../../stores/platform-user-store';
import PlatformUserActions from '../../actions/platform-user-actions';
import PlatformUserConstants from '../../constants/platform-user-constants';

var SignIn = React.createClass({

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
    var formGroupStyle = this.state.signInFailed ? "form-group has-error" : "form-group";
    var companyName = "";
    if(this.props.params.isManufacturer==1) {
      companyName = (
        <div className={formGroupStyle}>
          <label htmlFor="inputCompanyName" className="col-sm-3 control-label">Company Name</label>
          <div className="col-sm-9">
            <input type="text" className="form-control" id="inputCompanyName" ref="companyName" placeholder="Company Name" value={this.state.companyName} onChange={this.onFromInputChange}/>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="row" style={{height:100}}>
        </div>

        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Create Account</h3>
              </div>
              <div className="panel-body">
                <center>
                <form className="form-horizontal" role="signIn" onSubmit={this.signIn}>
                  <div className={formGroupStyle}>
                    <label htmlFor="inputUsername" className="col-sm-3 control-label">User Name</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="inputUsername" ref="username" placeholder="User Name" value={this.state.username} onChange={this.onFromInputChange}/>
                    </div>
                  </div>
                  <div className={formGroupStyle}>
                    <label htmlFor="inputPassword" className="col-sm-3 control-label">Password</label>
                    <div className="col-sm-9">
                      <input type="password" className="form-control" id="inputPassword" ref="password" placeholder="Password" value={this.state.password} onChange={this.onFromInputChange}/>
                    </div>
                  </div>
                  {companyName}

                  <div className="form-group pull">
                    <div className="col-sm-offset-3 col-sm-3 pull-right">
                      <button type="submit" className="btn btn-default btn-block">Sign in</button>
                    </div>
                  </div>
                </form>
              </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  onChange: function(event, data) {
    switch (event) {
      case "user_sign_in":

      this.context.router.push('/');
      break;

      case 'sign_in_failed':
      this.setState({signInFailed: true});
      break;

      default:
    }
  },

  onFromInputChange: function() {
    this.setState({
        username: ReactDOM.findDOMNode(this.refs.username).value,
        password: ReactDOM.findDOMNode(this.refs.password).value,
        role: this.props.params.isManufacturer == 1 ? PlatformUserConstants.role.manufacturer : PlatformUserConstants.role.user,
        companyName: ReactDOM.findDOMNode(this.refs.companyName).value
    });
  },

  checkPermissions: function() {
    var user = PlatformUserStore.getUser();
    var hasNoPermissions = user && user.role !== "";
    if(hasNoPermissions) {
      this.context.router.push('/');
    }
    return !hasNoPermissions;
  },

  signIn: function () {
    PlatformUserActions.signIn(this.state);
  },

});

export default SignIn;
