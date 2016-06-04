import Reflux from 'reflux'

var PlatformUserActions = Reflux.createActions([
    'signIn',
    'login',
    'logout',
    'editProfile',
    'newCheck',
    'linkERP',
    'getERP'
]);

export default PlatformUserActions;
