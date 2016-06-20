angular.module('starter.services')
  .service('cervejaStore', cervejaStore);

function cervejaStore($rootScope) {
  var _state;
  var KEY = 'cervejaStoreChange';

  function emitChange() {
    $rootScope.$emit(KEY);
  }
  
  this.on = function (fn) {
    $rootScope.$on(KEY, fn);
  };
  
  this.setState= function (state) {
    _state = _.extend({}, _state, state);
    emitChange();
  };

  this.getState = function () {
    return angular.copy(_state);
  }
}