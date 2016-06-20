angular.module('starter.controllers')

  .controller('CadastroNotasCtrl', function($ionicHistory, notaAction, cervejaAction, cervejaStore) {
    var vm = this;

    cervejaStore.on(function () {
      vm.cervejas = cervejaStore.getState().listaCervejas;
    });

    cervejaAction.buscarCervejas();

    this.salvar = function () {
      var nota = {
        cerveja: vm.cerveja,
        local  : vm.local,
        custoUnitario: vm.custoUnitario,
        quantidade: 0,
        status: "EM CONSUMO",
        data: Date.now()
      };

      notaAction.criar(nota, function (erro) {
        if (erro)
          return console.log(erro);

        $ionicHistory.goBack();
      });

    };

  });