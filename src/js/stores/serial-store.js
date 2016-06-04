import Reflux from 'reflux';
import SerialActions from '../actions/serial-actions';
import PlatformUserStore from './platform-user-store';
import HTTPService from '../services/http-service';

var SerialStore = Reflux.createStore({
  listenables : [SerialActions],

  getProductSerials: function(productId) {
    HTTPService.get('/serial/' + productId).then(function(response){
        this.fireUpdate('product_serials', response);
    }.bind(this));
  },


  updateProductSerials: function (productId) {
    HTTPService.get('/serial/' + productId + '/update').then(function(response){
        this.fireUpdate('product_serials_updated', response);
    }.bind(this));

  },

  associate: function(productId, serialsIds) {
    HTTPService.post('/serial/' + productId + '/associate', serialsIds).then(function(response){
        this.fireUpdate('serials_associated', response);
    }.bind(this));
  },

  delete: function(productId, serialsIds) {
    HTTPService.post('/serial/' + productId + '/delete', serialsIds).then(function(response){
        this.fireUpdate('serials_deleted', response);
    }.bind(this));
  },

  checkUID : function (serialCheckInfo) {
    HTTPService.post('/serial/check', serialCheckInfo).then(function(response){
        this.fireUpdate('check_complete', response);
    }.bind(this));
  },

  getSerialChecks : function(serial) {
    HTTPService.get('/serial/checks/' + serial).then(function(response){
        this.fireUpdate('serial_checks', response);
    }.bind(this));
  },

  fireUpdate: function (event, data) {
    this.trigger(event, data);
  }

});

export default SerialStore;
