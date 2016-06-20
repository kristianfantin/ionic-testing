angular.module('starter.controllers')

.controller('CadastroCervejasCtrl', function($ionicHistory, cervejaAction) {
    var vm = this;

    this.salvar = function () {
      cervejaAction.criar(vm.cerveja, function (erro) {
        if (erro)
          return console.log(erro);

        $ionicHistory.goBack();
      });

    };

  });