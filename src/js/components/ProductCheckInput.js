import React from 'react';
import Reflux from 'reflux';
import UIDActions from '../actions/uid-actions';
import UIDStore from '../stores/uid-store';

var ProductCheckInput = React.createClass ({
  mixins : [Reflux.listenTo(UIDStore, 'onChange')],

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
            <input type="text" className="form-control" onChange={this.handleChange} value={this.state.uid} placeholder="Check your product authticity" />
          </div>
          <div className="col-sm-2 col">
            <button type="button" className="btn btn-primary" onClick={this.check}>Check</button>
          </div>
        </form>
      </div>
    );
  },

  check : function(event) {
    event.preventDefault();
    UIDActions.checkUID(this.state.uid);
  },

  onChange : function (event, data) {
    switch (event) {
      case 'checkComplete':
      //do something
      console.log('event checkComplete recieved now we will update the UI with the data: ' + data);
        break;
      default:

    }
  }
});
export default ProductCheckInput;
