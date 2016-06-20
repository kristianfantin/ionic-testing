angular.module('starter.services')
  .service('notaStore', notaStore);

function notaStore($rootScope) {
  var _state;
  var KEY = 'notaStoreChange';

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