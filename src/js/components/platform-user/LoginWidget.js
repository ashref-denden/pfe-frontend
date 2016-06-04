import React from 'react';
import Reflux from 'reflux';
import ReactDOM from 'react-dom'
import PlatformUserStore from '../../stores/platform-user-store';
import PlatformUserActions from '../../actions/platform-user-actions';

var LoginWidget = React.createClass({

  mixins : [Reflux.listenTo(PlatformUserStore, 'onChange')],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState : function() {
    return PlatformUserStore.getUser();
  },

  render : function(){
    var fromGroupClassName = this.state.isLoginFailed ?  "form-group has-error" : "form-group";
    return (
      <center>
  		  <div className="navbar-collapse collapse" id="navbar-main">
  			   <form className="navbar-form navbar-right" role="login" onSubmit={this.login}>
            <div className="row no-gutter">
              <div className="col-sm-5 col-xs-3">
                <div className={fromGroupClassName}>
                  <input type="text" className="form-control" ref="username" placeholder="Username" value={this.state.username} onChange={this.onFromInputChange} />
                </div>
              </div>
              <div className="col-sm-5 col-xs-3">
                <div className={fromGroupClassName}>
                  <input type="password" className="form-control" ref="password" placeholder="Password" value={this.state.password} onChange={this.onFromInputChange} />
                </div>
              </div>
              <div className="col-sm-2 col-xs-1 pull-left">
  						  <button type="submit" className="btn btn-default" onClick={this.login}>Login</button><br/>
              </div>
            </div>
  				</form>
  			</div>
  		</center>
    );
  },

  login: function(e) {
    e.preventDefault();
    PlatformUserActions.login(this.state);
  },

  onChange: function(event, data) {
    switch (event) {
      case 'login_failed':
      var user = PlatformUserStore.getUser();
      user.isLoginFailed = true;
      this.setState(user);
      break;
      default:
    }
  },

  onFromInputChange: function() {
    this.setState({
        username: ReactDOM.findDOMNode(this.refs.username).value,
        password: ReactDOM.findDOMNode(this.refs.password).value
    });
  }

});

export default LoginWidget;
