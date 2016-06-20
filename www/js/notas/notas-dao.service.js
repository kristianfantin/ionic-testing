angular.module('starter.services')

.factory('notaDao', function(executeSql, getOne, getAll) {

    return {
      all: function() {
        return executeSql('select * from nota').then(getAll);
      },

      save: function (nota) {
        console.log("Nota: ", nota);

        if (nota.id)
          return executeSql('replace into nota(id, local, cervejaId, custoUnitario, quantidade, data, status)' +
            'values(?,?,?,?,?,?,?)',[nota.id, nota.local, nota.cerveja.id, nota.custoUnitario, nota.quantidade, nota.data, nota.status]);

        return executeSql('insert into nota(local, cervejaId, custoUnitario, quantidade, data, status)' +
                          'values(?, ?, ?, ?, ?, ?)',[nota.local, nota.cerveja.id, nota.custoUnitario, nota.quantidade, nota.data, nota.status]);
      },

      remove: function(nota) {
        return executeSql('delete from nota where id = ?', [nota.id]);
      },

      get: function(notaId) {
        return executeSql('select * from nota where id = ?', [notaId]).then(getOne);
      }
    };
  });

