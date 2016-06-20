angular.module('starter.controllers')

  .controller('ListaCervejasCtrl', function($scope, $ionicHistory, cervejaAction, cervejaStore) {
    var vm = this;
    
    cervejaStore.on(function () {
      vm.cervejas = cervejaStore.getState().listaCervejas;
    });
    
    cervejaAction.buscarCervejas();

    this.remove = function (cerveja) {
      cervejaAction.remove(cerveja, function (erro) {
        if (erro)
          return console.log(erro);

        $ionicHistory.goBack();
      });
    };

  })
;