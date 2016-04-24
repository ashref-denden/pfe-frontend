import Reflux from 'reflux';
import ProductActions from '../actions/product-actions';
import HTTPService from '../services/http-service';

var ProductStore = Reflux.createStore({
  listenables : [ProductActions],
  addProduct : function (product) {
    console.log("calling backend api method");
    HTTPService.post('/product/add', product).then(function(response){
        this.fireUpdate('checkComplete', response);
    });

  },

  fireUpdate : function (event, data) {
    console.log('Processing actions finished now we will update the ui that listening to the event ' + event + ' and need the data:' + data);
    this.trigger(event, data);
    }

});

export default ProductStore;
