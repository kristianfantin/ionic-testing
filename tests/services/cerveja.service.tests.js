describe('Cervejas Unit Tests', function(){
  var cervejaAction;
  var cervejaStore;
  var $rootScope;

  var CERVEJAS = [{
    id: 0,
    name: 'SKOL',
    userId: 1
  }, {
    id: 1,
    name: 'BRAHMA',
    userId: 1
  }, {
    id: 2,
    name: 'ANTARTICA',
    userId: 1
  }, {
    id: 3,
    name: 'ITAIPAVA',
    userId: 1
  }, {
    id: 4,
    name: 'BOHEMIA',
    userId: 1
  }, {
    id: 5,
    name: 'ORIGINAL',
    userId: 1
  }];

  beforeEach(module('starter.services'));
  beforeEach(module(function ($provide) {
    $provide.factory('cervejaDao', function ($q) {


      return {
        all: function() {
          return $q.when(CERVEJAS);
        },

        getByName: function (name) {
          for (var i = 0; i < CERVEJAS.length; i++)
            if (CERVEJAS[i].name === name)
              return $q.when(CERVEJAS[i]);

          return $q.when(null);
        },

        save: function (cerveja) {
          this.getByName(cerveja.name)
            .then(function () {
              return $q.reject("Cerveja já existente.");
            },function () {
              cerveja.userId = 1;
              return $q.when(CERVEJAS.push(cerveja));
            })
        },

        remove: function(cerveja) {
          return $q.when(CERVEJAS.splice(CERVEJAS.indexOf(cerveja), 1));
        },

        get: function(cervejaId) {
          for (var i = 0; i < CERVEJAS.length; i++)
            if (CERVEJAS[i].id === parseInt(cervejaId))
              return $q.when(CERVEJAS[i]);

          return $q.when(null);
        }
      };
    })
  }));

  beforeEach(inject(function (_cervejaAction_, _cervejaStore_, _$rootScope_) {
    $rootScope = _$rootScope_;
    cervejaAction = _cervejaAction_;
    cervejaStore = _cervejaStore_;
  }));

  it('Deve haver definição de CervejaDao', inject(function(cervejaDao) {
    expect(cervejaDao).toBeDefined();
  }));

  it('Deve haver definição de CervejaAction', inject(function(cervejaAction) {
    expect(cervejaAction).toBeDefined();
  }));

  it('Deve haver definição de CervejaStore', inject(function(cervejaStore) {
    expect(cervejaStore).toBeDefined();
  }));

  it('SetState deve retornar lista de 6 Cervejas Cadastradas', function (){
    var setState = spyOn(cervejaStore, 'setState');
    cervejaAction.buscarCervejas();

    $rootScope.$digest();
    expect(setState).toHaveBeenCalledWith({
      sort: 'name',
      listaCervejas: _.sortBy(CERVEJAS, 'name')
    });
  });

  it('Não deve permitir cadastrar cerveja existente', function (){
    var cerveja = {
      id: 6,
      name: 'BRAHMA',
      userId: 1
    };

    var erroEsperado = "Cerveja já existente.";
    var erroOcorrido = "";

    cervejaAction.criar(cerveja, function (erro) {
      if (erro)
        erroOcorrido = erro;
    });

    console.log(CERVEJAS);
    $rootScope.$digest();
    expect(erroEsperado).toEqual(erroOcorrido);
  });


});