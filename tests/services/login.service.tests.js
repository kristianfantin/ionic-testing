describe('Users Unit Tests', function(){
  var LoginService;
  var $rootScope;

  beforeEach(module('starter.services'));
  beforeEach(module(function ($provide) {
    $provide.factory('Users', function ($q) {
      return {
        get: function (name) {
          var result = name === 'alan' ? {
            name: 'alan', senha: 'a'
          } : null;
          return $q.when(result);
        }
      };
    })
  }));

  beforeEach(inject(function (_LoginService_, _$rootScope_) {
    LoginService = _LoginService_;
    $rootScope = _$rootScope_;
  }));

  it('Deve existir Usuários', inject(function(Users) {
    expect(Users).toBeDefined();
  }));

  it('Deve existir nome de Usuário', function (done){
    var nome = null;
    var senha= null;
    var erroEsperado = 'Usuário inválido.';

    LoginService.loginUser(nome, senha)
      .then(function(){},
        function (error) {
          expect(error).toEqual(erroEsperado);
          done();
      });

    $rootScope.$digest();
  });

  it('Deve existir nome de Usuário não vazio', function (done){
    var nome = "";
    var senha= null;
    var erroEsperado = 'Usuário inválido.';

    LoginService.loginUser(nome, senha)
      .then(function(){},
        function (error) {
          expect(error).toEqual(erroEsperado);
          done();
        });

    $rootScope.$digest();
  });


  it('Deve existir senha de Usuário', function (done){
    var nome = "alan";
    var senha= null;
    var erroEsperado = 'Senha inválida.';

    LoginService.loginUser(nome, senha)
      .then(function(){},
        function (error) {
          expect(error).toEqual(erroEsperado);
          done();
        });

    $rootScope.$digest();
  });

  it('Deve existir senha de Usuário não vazio', function (done){
    var nome = "alan";
    var senha= "";
    var erroEsperado = 'Senha inválida.';

    LoginService.loginUser(nome, senha)
      .then(function(){},
        function (error) {
          expect(error).toEqual(erroEsperado);
          done();
        });

    $rootScope.$digest();
  });

  it('Usuario não existe', function (done){
    var nome = "patrick";
    var senha= "p";
    var erroEsperado = 'Usuário inválido.';

    LoginService.loginUser(nome, senha)
      .then(function(){},
        function (error) {
          expect(error).toEqual(erroEsperado);
          done();
        });

    $rootScope.$digest();
  });

  it('Senha não confere', function (done){
    var nome = "alan";
    var senha= "p";
    var erroEsperado = 'Senha não confere.';

    LoginService.loginUser(nome, senha)
      .then(function(){},
        function (error) {
          expect(error).toEqual(erroEsperado);
          done();
        });

    $rootScope.$digest();
  });

  it('Seja Bem vindo', function (done){
    var nome = "alan";
    var senha= "a";
    var saidaEsperada = 'Bem vindo ' + nome + '!';

    LoginService.loginUser(nome, senha)
      .then(function(data){
        expect(data).toEqual(saidaEsperada);
        done();
      },function () { });

    $rootScope.$digest();
  });

});