angular.module('starter.controllers')

.controller('MenuCtrl', function($scope, $ionicPopup, $state, ItensMenu) {
  var self = this;

  this.menuCompleto = function () {
    return ItensMenu.all();
  }

  this.selecionaItem = function (itemMenu) {
    $state.go(itemMenu.acao);
  }
});
