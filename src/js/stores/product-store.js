import Reflux from 'reflux';
import ProductActions from '../actions/product-actions';
import HTTPService from '../services/http-service';

var ProductStore = Reflux.createStore({
  listenables : [ProductActions],

  addProduct: function (product) {
    HTTPService.post('/product/add', product).then(function(response){
        this.fireUpdate('product_added', response);
    }.bind(this));

  },

  getManufacturerProducts: function(manufacturerName) {
    HTTPService.get('/product/' + manufacturerName).then(function(response){
        this.fireUpdate('manufacturer_products', (response));
    }.bind(this));
  },

  deleteManufacturerProducts: function(manufacturerName, productsIds) {
    HTTPService.post('/product/' + manufacturerName + '/delete', productsIds).then(function(response){
        this.fireUpdate('products_deleted', response);
    }.bind(this));
  },

  fireUpdate: function (event, data) {
    this.trigger(event, data);
  }

});

export default ProductStore;
