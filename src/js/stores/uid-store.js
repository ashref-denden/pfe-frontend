import Reflux from 'reflux';
import UIDActions from '../actions/uid-actions';
import UIDService from '../services/uid-service';

var UIDStore = Reflux.createStore({
  listenables : [UIDActions],
  checkUID : function (uid) {
    UIDService.post('/uid/check',{"uid" : uid}).then(function(response){
        this.fireUpdate('checkComplete', response);
    });

  },

  fireUpdate : function (event, data) {
    console.log('Processing actions finished now we will update the ui that listening to the event ' + event + ' and need the data:' + data);
    this.trigger(event, data);
    }

});

export default UIDStore;
