angular.module('starter.controllers')

  .controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $ionicHistory) {
    var self = this;

    this.login = function() {
      LoginService.loginUser(self.user.toUpperCase(), self.senha.toUpperCase())
        .then(function(data) {
          var alertPopup = $ionicPopup.prompt({
            title: data,
            template: 'Carpe Diem',
            buttons:[
              {
                text: 'OK',
                type:'button-positive'
              }]
          });
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('menu.listaNotas');
        })
        .catch(function (data) {
          var alertPopup = $ionicPopup.alert({
            title: data
          });
        });
    }

    this.btnOk = function () {
      self.login();
    };

    this.btnCancel = function () {
      self.user = null;
      self.senha = null;
    };
  })
;