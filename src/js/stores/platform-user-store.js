import Reflux from 'reflux';
import PlatformUserActions from '../actions/platform-user-actions';
import HTTPService from '../services/http-service';
import PlatformUserConstants from '../constants/platform-user-constants';

var PlatformUserStore = Reflux.createStore({
    listenables: [PlatformUserActions],

    signIn: function(data) {
      HTTPService.post('/user/signIn', {username: data.username, password: data.password, role: data.role, companyName: data.companyName})
      .then(function(response){
        if(response.id) {
          response.userLoggedIn = true;
          var userString = JSON.stringify({
            userId: response.id,
            username: data.username,
            role: response.role,
            companyName: response.companyName,
            userLoggedIn: response.userLoggedIn,
            erpLinked: response.erpLinked
          });
          localStorage.setItem(PlatformUserConstants.platformUserLocalStorageKey, userString);
          this.fireUpdate('user_sign_in', response);
        } else {
          this.fireUpdate('sign_in_failed', response);
        }

      }.bind(this));
    },

    login: function(data){
      HTTPService.post('/user/login', {username: data.username, password: data.password}).then(function(response){
        if(response.id) {
          response.userLoggedIn = true;
          var userString = JSON.stringify({
            userId: response.id,
            username: data.username,
            role: response.role,
            companyName: response.companyName,
            userLoggedIn: response.userLoggedIn,
            erpLinked: response.erpLinked
          });
          localStorage.setItem(PlatformUserConstants.platformUserLocalStorageKey, userString);
          this.fireUpdate('user_login', response);
        } else {
          this.fireUpdate('login_failed', response);
        }

      }.bind(this));
    },

    logout: function() {
      localStorage.removeItem(PlatformUserConstants.platformUserLocalStorageKey);
      this.fireUpdate('user_logout');
    },

    editProfile: function(data) {
      HTTPService.post('/user/'  + data.userId + '/editProfile', {username: data.username, companyName: data.companyName})
      .then(function(response){
        if(response.id) {
          response.userLoggedIn = true;
          var userString = JSON.stringify({
            userId: response.id,
            username: data.username,
            role: response.role,
            companyName: response.companyName,
            userLoggedIn: response.userLoggedIn,
            erpLinked: response.erpLinked
          });
          localStorage.setItem(PlatformUserConstants.platformUserLocalStorageKey, userString);
          this.fireUpdate('edit_success', response);
        } else {
          this.fireUpdate('edit_failed', response);
        }

      }.bind(this));
    },

    newCheck: function() {
      this.fireUpdate('new_check');
    },

    linkERP: function(data) {
      var user = JSON.parse(localStorage.getItem(PlatformUserConstants.platformUserLocalStorageKey));
      HTTPService.post('/user/' + user.userId  + '/linkERP', data).then(function(response){

        if(response) {
          user.erpLinked = true;
          this.fireUpdate('erp_linked', response);
        } else {
          user.erpLinked  =  false;
          this.fireUpdate('erp_not_linked', response);
        }
        localStorage.removeItem(PlatformUserConstants.platformUserLocalStorageKey);
        localStorage.setItem(PlatformUserConstants.platformUserLocalStorageKey, JSON.stringify(user));
      }.bind(this));
    },

    getERP: function(manufacturerId){
      HTTPService.get('/user/' + manufacturerId  + '/getERP').then(function(response){
          this.fireUpdate('erp', (response));
      }.bind(this));
    },

    fireUpdate: function (event, data) {
      this.trigger(event, data);
    },

    getUser: function() {
      var user = localStorage.getItem(PlatformUserConstants.platformUserLocalStorageKey);
      if (!user) {
        this.user = {
          username: '',
          password: '',
          role: '',
          companyName: '',
          userLoggedIn: false
        }
      } else {
        this.user = JSON.parse(user);
      }
      return this.user;
    }

});

export default PlatformUserStore;
