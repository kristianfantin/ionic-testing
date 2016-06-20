angular.module('starter.services')

.factory('ItensMenu', function () {
    var itens = [
      {
        codigo:1,
        descricao: 'Notas',
        state: 'menu.listaNotas'
      },
      {
        codigo:0,
        descricao: 'Cervejas',
        state: 'menu.listaCervejas'
      },
      {
        codigo:3,
        descricao: 'Cervejas mais baratas',
        state: 'relatorios'
      }
    ];
    return {
      all: function() {
        return itens;
      },
      remove: function(item) {
        itens.splice(itens.indexOf(item), 1);
      },
      get: function(itemId) {
        for (var i = 0; i < itens.length; i++) {
          if (itens[i].codigo === parseInt(itemId)) {
            return itens[i];
          }
        }
        return null;
      }
    };

  })