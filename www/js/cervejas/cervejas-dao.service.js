angular.module('starter.services')

.factory('cervejaDao', function(LoginStore, executeSql, getOne, getAll) {
    return {
      all: function() {
        return executeSql("select * from cerveja")
          .then(getAll);
      },

      getByName: function (name) {
        return executeSql("select * from cerveja where name = ?", [name])
          .then(getOne);
      },

      save: function (cerveja) {
        cerveja.userId = LoginStore.getUsuarioLogado().id;
        return executeSql('insert or replace into cerveja(name, userId) values(?,?)',[cerveja.name, cerveja.userId]);
      },

      remove: function(cerveja) {
        return executeSql("delete from cerveja where id = ?", [cerveja.id]);
      },

      get: function(cervejaId) {
        return executeSql("select * from cerveja where id = ?", [cervejaId])
          .then(getOne);
      }
    };
  });