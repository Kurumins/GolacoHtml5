'use strict';
angular.module('app')
  .config(loginRoutesConfig);

function loginController ($state, AppService, ezfb, $loading) {
  var vm = this;
  // AppService.getFbDetails()

  ezfb.getLoginStatus()
    .then(function (response) {
      if (response.status === 'connected') {
        vm.accessToken = response.authResponse.accessToken;
      }
    });

  vm.loginFacebook = function () {

    var promisse;

    $loading.start('PostToJs');

    if ( vm.accessToken ) {
      promisse = AppService.getFbDetails(vm.accessToken);
    } else {
      promisse = ezfb.login()
        .then(function (response) {
          return AppService.getFbDetails(response.authResponse.accessToken);
        })
    }

    promisse
      .then(function (response) {
        if ( response ) {
          $state.go('app');
        } else {
          alert('Falha ao logar');
        }
      })
      .catch(console.log)
      .finally(function () {
        $loading.finish('PostToJs');
      });
  };

  vm.login = function (user) {
    $loading.start('PostToJs');
    AppService.login(user.email, user.password)
      .then(function (response) {
        if ( !response.error ) {
          $state.go('app');
        } else {
          alert(response.error);
        }
      })
      .finally(function () {
        $loading.finish('PostToJs');
      });

  };
}

function loginRoutesConfig ($stateProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'login.html',
      controller: loginController,
      controllerAs: '$ctrl'
    })
}
