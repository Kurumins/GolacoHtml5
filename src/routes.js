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
      component: 'app'
    })
    .state('app.main', {
      url: '/',
      component: 'main'
    })
    .state('app.teste', {
      url: '/teste',
      component: 'teste'
    });

}
