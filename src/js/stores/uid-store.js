import Reflux from 'reflux';
import UIDActions from '../actions/uid-actions';

var UIDStore = Reflux.createStore({
  listenables : [UIDActions],
  checkUID : function () {
    console.log('UIDStore is listening to the checkUID action and it captured it now the store will execute the code to handle this action');
    //querey the server

    this.fireUpdate('checkComplete', 'null');
  },

  fireUpdate : function (event, data) {
    console.log('Processing actions finished now we will update the ui that listening to the event ' + event + ' and need the data:' + data);
    this.trigger(event, data);
    }

});

export default UIDStore;
