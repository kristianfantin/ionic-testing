angular.module('starter.controllers', ['ngCordova']);

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, db) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl as vm'
  })

  .state('menu', {
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl as vm'
  })

    .state('menu.listaCervejas', {
      url: '/listaCervejas',
      views: {
        menuContent: {
          templateUrl: 'templates/lista-cervejas.html',
          controller: 'ListaCervejasCtrl as vm'
        }
      }
    })

    .state('menu.listaNotas', {
      url: '/lista-notas',
      views: {
        menuContent: {
          templateUrl: 'templates/lista-notas.html',
          controller: 'ListaNotasCtrl as vm'
        }
      }
    })

    .state('menu.cadastroNotas', {
      url: '/cadastro-notas',
      views: {
        menuContent: {
          templateUrl: 'templates/cadastro-notas.html',
          controller: 'CadastroNotasCtrl as vm'
        }
      }
    })

    .state('menu.cadastroCervejas', {
      url: '/cadastroCervejas',
      views: {
        menuContent: {
          templateUrl: 'templates/cadastro-cervejas.html',
          controller: 'CadastroCervejasCtrl as vm'
        }
      }
    })

  ;

  $urlRouterProvider.otherwise('/login');

})

.factory("executeSql", executeSql)
.factory('getOne', getOne)
.factory('getAll', getAll)

.service('db', function ($ionicPlatform, $cordovaSQLite) {

  return $ionicPlatform.ready().then(function() {
    var db;
    if (window.sqlitePlugin) {
      db =  window.sqlitePlugin.openDatabase({ name: "ibeer.db", location: 'default' });
    } else {
      db = openDatabase("ibeer", "1.0", "Web SQL Database", 200000);
    }

    return db;
  });

})
  .run(createSchema);

function createSchema(executeSql) {
  executeSql('create table if not exists usuario (id integer, name text, senha text, primary key (id))');
  executeSql('create table if not exists cerveja (id integer, name text, userId integer, ' +
    'primary key (id) ,foreign key(userId) references usuario(id))');
  executeSql('create table if not exists nota (id integer, local text, cervejaId integer, ' +
    ' custoUnitario float, quantidade integer, data date, status text,' +
    'primary key(id) foreign key(cervejaId) references cerveja(id))');

  executeSql('insert or replace into usuario values(1, "EU", "1")');
  executeSql('insert or replace into cerveja values(1, "BRAHMA", 1)');
}

function executeSql(db, $q) {

  return function (sql, params) {

    return db.then(function (db) {
      var deferred = $q.defer();

      db.transaction(function (tx) {
        tx.executeSql(sql, params,
          function (tx, result) {
            deferred.resolve(result);
          }, function (tx, err) {
             deferred.reject(err);
          });
      });

      return deferred.promise;
    })
      .catch(console.log.bind(console));

  };
}

function getOne() {
  return function (sqlResult) {
    return sqlResult.rows.length > 0 ? sqlResult.rows.item(0) : null;
  };
}

function getAll() {
  return function (sqlResult) {

    var array = [];
    for (var i=0; i < sqlResult.rows.length; i++) {
      array.push(sqlResult.rows.item(i))
    }

    return array;
  };
}

angular.module('starter.services', []);
