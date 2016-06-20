function validaLogin(name, pw, user, $q) {
  if ((name == null || name.length == 0) || user == null)
    return $q.reject('Usuário inválido.');
  else if (pw == null || pw.length == 0)
    return $q.reject('Senha inválida.');
  else if (name === user.name && pw === user.senha)
    return $q.when('Bem vindo ' + name + '!');
  else
    return $q.reject('Senha não confere.');
}

angular.module('starter.services')

.factory('Users', function (executeSql, getOne) {
  
  return {
    remove: function(user) {
      return executeSql("delete from usuario where id = ?", [user.id]);
    },
    get: function(userId) {
      return executeSql("select * from usuario where name = ?", [userId])
        .then(getOne);
    }
  };

})

.service('LoginService', function($q, Users, LoginStore) {
  return {
    loginUser: function(name, pw) {
      return Users.get(name)
        .then(function (user) {
          return validaLogin(name, pw, user, $q).then(function (result) {
            LoginStore.setUsuarioLogado(user);
            return result;
          });
        });

    }
  }
})

.service("LoginStore", function () {
  this.setUsuarioLogado = function (user) {
    localStorage.setItem("usuarioLogado", JSON.stringify(user));
  }

  this.getUsuarioLogado = function () {
    var usuario = localStorage.getItem("usuarioLogado");
    return usuario? JSON.parse(usuario) : null;
  }
});