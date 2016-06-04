import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';
import PlatformUserStore from '../stores/platform-user-store';
import LoginWidget from './platform-user/LoginWidget';
import LogoutWidget from './platform-user/LogoutWidget';

var NavBar = React.createClass({

  mixins : [Reflux.listenTo(PlatformUserStore, 'onChange')],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render : function(){
    var login = this.props.isLogin ? "" : PlatformUserStore.getUser().userLoggedIn ?   <LogoutWidget/> : <LoginWidget/>;
    return (
    <div className="navbar navbar-default navbar-fixed-top">
  		<div className="container">
  			<div className="navbar-header">
  				<button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
  					<span className="icon-bar"></span>
  					<span className="icon-bar"></span>
  					<span className="icon-bar"></span>
  				</button>
          <Link to={`/`}>
  				    <img src="./img/logo.png" height="43" width="226" />
          </Link>
  			</div>
        {login}
      </div>
    </div>
    );
  },

  onChange: function(event, data) {
    switch (event) {
      case 'user_login':
      this.setState({});
      break;

      case 'user_logout':
      this.setState({});
      break;

      default:
    }
  },
});

export default NavBar;
