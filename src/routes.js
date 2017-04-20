'use strict';
angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig ($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);// .hashPrefix('!');

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '',
      abstract: true,
      resolve: {
        user: function (AppService) {
          return AppService.auth()
            .then(function (/*result*/) {
              // console.log(result.data.auth);
              return AppService.userVerify();
            });
        }
      },
      // component: 'app'
      templateUrl: 'app.html',
      controller: 'AppController as appCtrl'
    })
    .state('app.itens', {
      url: '/itens',
      // component: 'itens'
      templateUrl: 'itens.html',
      controller: 'ItensController'
    })
    .state('app.teste', {
      url: '/',
      component: 'teste'
    });

}
