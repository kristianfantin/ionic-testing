angular.module('starter.controllers')

  .controller('ListaNotasCtrl', function($scope, $ionicHistory, notaAction, notaStore) {
    var vm = this;

    notaStore.on(function () {
      vm.notas = notaStore.getState().listaNotas;
    });

    notaAction.buscarNotas();

    this.remove = function (nota) {
      notaAction.remove(nota, function (erro) {
        if (erro)
          return console.log(erro);

        $ionicHistory.goBack();
      });

    };
    
    this.abreConsumo = function (nota) {
      notaAction.abreConsumo(nota);
    };

    this.fechaConsumo = function (nota) {
      notaAction.fechaConsumo(nota);
    };

    this.addQuantidade = function (nota) {
      notaAction.addQuantidade(nota);
    }

    this.lessQuantidade = function (nota) {
      notaAction.lessQuantidade(nota);
    }

    this.mostraParaEmConsumo = function (nota) {
      return nota.status == 'EM CONSUMO';
    }

    this.mostraParaFechado = function (nota) {
      return nota.status == 'FECHADO';
    }

  })
;