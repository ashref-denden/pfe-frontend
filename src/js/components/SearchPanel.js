import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';
import PlatformUserStore from '../stores/platform-user-store';
import PlatformUserActions from '../actions/platform-user-actions';
import SerialStore from '../stores/serial-store';
import PlatformUserConstants from '../constants/platform-user-constants';

import ProductCheckInput from './ProductCheckInput';

var SearchPanel = React.createClass ({

  mixins : [Reflux.listenTo(PlatformUserStore, 'onChange'), Reflux.listenTo(SerialStore, 'onChange')],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentWillMount: function() {
    this.checkPermissions();
  },

  render : function(){
    var paddingStyle = {
      height: 150
    };

    var signInPanels = "";

    if(PlatformUserStore.getUser().username === "") {
      signInPanels = (
        <div className="row">
          <div className="col-sm-6">
            <div className="panel panel-info">
              <div className="panel-heading">Sign in as a Manufacturer</div>
              <div className="panel-body">
                <ul className="list-group">
                  <li className="list-group-item">Add you own Brands</li>
                  <li className="list-group-item">Link it to you ERP system</li>
                  <li className="list-group-item">Get live feedback from brand community</li>
                  <li className="list-group-item">Detect Counterfieted product much sooner</li>
                </ul>
                <Link className="pull-right"  to={`/signIn/1`}>Sign in</Link>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="panel panel-info">
              <div className="panel-heading">Sign in and join the community</div>
              <div className="panel-body">
                <ul className="list-group">
                  <li className="list-group-item">Give your own feedback</li>
                  <li className="list-group-item">Share information with the community</li>
                  <li className="list-group-item">Contact your favorite brand Manufacturer</li>
                  <li className="list-group-item">Help fight Counterfieted products</li>
                </ul>
                <Link className="pull-right"  to={`/signIn/0`}>Sign in</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    var checkResultPanel = "";
    if(this.state && this.state.message) {
      var panelStyle;
      var panelTitle;

      if(this.state.checkResult) {
        panelStyle = "panel panel-success";
        panelTitle = "Product Authentic";
      } else {
        panelStyle = "panel panel-danger";
        panelTitle = "Product Counterfieted!";
      }

      checkResultPanel = (
        <div className="panel panel-default" className={panelStyle}>
          <div className="panel-heading">{panelTitle}</div>
          <div className="panel-body">
          <p>{this.state.message}</p>



          <div className="row">
              <div className="col-md-4 col-md-offset-4">
                <button type="button" className="btn btn-primary" title="Do Another Check" onClick={this.newCheck}>
                  <i className="glyphicon glyphicons-eye-open"></i>
                  <span> </span>
                  <span>New Check</span>
                </button>
              </div>
          </div>
          </div>
        </div>
      );
    }

    var homePageContent = this.state && this.state.message ? checkResultPanel : <ProductCheckInput />;

    return (
      <div>
        <div className="row" style={paddingStyle}>
        </div>
        <Link to={`/`}>
        <div className="row">
        <div className="col-md-4 col-md-offset-3 pull-left">
            <img src="./img/logo.png" height="200" width="500" />
        </div>
        </div>
        </Link>
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
           {homePageContent}
            <div className="row" style={{height: 100}}></div>
            {signInPanels}
        </div>
      </div>
    </div>
    );
  },

  onChange : function (event, data) {
    switch (event) {
      case 'user_sign_in':
      this.context.router.push('/products');
      break;

      case 'user_login':
      this.context.router.push('/products');
      break;

      case 'user_logout':
      this.setState({});
      break;

      case 'check_complete':
      this.setState(data)
      break;

      case 'new_check':
      this.replaceState({});
      break;

      default:

    }
  },

  checkPermissions: function() {
    var user = PlatformUserStore.getUser();
    if(user && user.role === PlatformUserConstants.role.manufacturer) {
      this.context.router.push('/products');
    }
  },

  newCheck: function () {
    PlatformUserActions.newCheck();
  }

});

export default SearchPanel;
