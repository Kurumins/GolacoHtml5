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

    // .state('app.itens', {
    //   url: '/itens',
    //   abstract: '.destaques',
    //   resolve: {
    //     inventory: function (ItensService) {
    //       return ItensService.inventory();
    //     },
    //     storeList: function (ItensService) {
    //       return ItensService.storeList();
    //     }
    //   },
    //   templateUrl: 'itens.html',
    //   controller: 'ItensController as $itensCtrl'
    // })

    // .state('app.itens.destaques', {
    //   url: '',
    //   // component: 'itens'
    //   templateUrl: 'itens-highlights.html',
    //   // controller: 'ItensController'
    //   // template: 'destaques'
    // })

    // .state('app.itens.itens', {
    //   url: '/:category/:loja',
    //   params: {
    //     category: {
    //       value: '13',
    //       // default: 13,
    //       squash: false
    //     },
    //     loja: {
    //       value: null,
    //       squash: true
    //     }
    //   },
    //   resolve: {
    //     teste: function ($stateParams, inventory, storeList) {
    //       // console.log($stateParams);
    //     }
    //   },
    //   templateUrl: 'itens-itens.html',
    //   // controller: 'ItensController'
    //   // template: 'destaques'
    // })

    .state('app.teste', {
      url: '/',
      component: 'teste'
    });

}
