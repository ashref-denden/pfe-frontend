import React from 'react';
import Reflux from 'reflux';
import UIDActions from '../actions/uid-actions';
import UIDStore from '../stores/uid-store';

var ProductCheckInput = React.createClass ({
  mixins : [Reflux.listenTo(UIDStore, 'onChange')],
  render : function() {
    return (
      <div className="row">
        <form className="form-group" role="form">
          <div className="col-sm-10 col">
            <input type="text" className="form-control" placeholder="Check your product authticity"></input>
          </div>
          <div className="col-sm-2 col">
            <button type="button" className="btn btn-primary" onClick={this.check}>Check</button>
          </div>
        </form>
      </div>
    );
  },

  check() {
    console.log('from UI (ProductCheckInput)-> Actions (UIDActions) : creating action');
    //Create action checkUID
    UIDActions.checkUID();
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
