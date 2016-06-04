import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import SerialActions from '../actions/serial-actions';
import PlatformUserStore from '../stores/platform-user-store';

var ProductCheckInput = React.createClass ({

  getInitialState : function() {
      return {uid : ""};
  },

  handleChange : function(event) {
    this.setState({uid : event.target.value});
  },

  render : function() {
    return (
      <div className="row">
        <form className="form-group" role="form" onSubmit={this.check}>
          <div className="col-sm-10 col">
            <input type="text" className="form-control" onChange={this.handleChange} value={this.state.uid} placeholder="Check your product authticity" onChange={this.onFormInputChange} ref="uid"/>
          </div>
          <div className="col-sm-2 col">
            <button type="button" className="btn btn-primary" onClick={this.check}>Check</button>
          </div>
        </form>
      </div>
    );
  },

  onFormInputChange : function(){
    this.setState({
      uid: ReactDOM.findDOMNode(this.refs.uid).value
    })
  },


  check : function(event) {
    event.preventDefault();
    SerialActions.checkUID({userId: PlatformUserStore.getUser().userId, uid: this.state.uid});
  }

});

export default ProductCheckInput;
