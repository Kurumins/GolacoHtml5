'use strict';
angular.module('app')
  .controller('ItensController', function (ItensService, inventory, storeList) {

    var vm = this;

    vm.inventory = inventory.data.data;
    vm.storeList = storeList.data.data;

  })
  .config(function routesConfig ($stateProvider) {

    $stateProvider

      .state('app.itens', {
        url: '/itens',
        abstract: '.destaques',
        resolve: {
          inventory: function (ItensService) {
            return ItensService.inventory();
          },
          storeList: function (ItensService) {
            return ItensService.storeList();
          }
        },
        templateUrl: 'itens.html',
        controller: 'ItensController as $itensCtrl'
      })

      .state('app.itens.destaques', {
        url: '',
        // component: 'itens'
        templateUrl: 'itens-highlights.html',
        // controller: 'ItensController'
        // template: 'destaques'
      })

      .state('app.itens.itens', {
        url: '/:category/:inventario',
        params: {
          category: {
            value: '13',
            // default: 13,
            squash: false
          },
          inventario: {
            value: null,
            squash: true
          }
        },
        resolve: {
          itens: function ($stateParams, inventory, storeList) {
            return storeList.data.data.TeamPlayerItems;
          }
        },
        templateUrl: 'itens-itens.html',
        controller: function ($scope, itens) {
          $scope.teste = itens;
        }
        // template: 'destaques'
      });

})
