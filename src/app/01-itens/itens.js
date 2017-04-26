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
        templateUrl: 'itens-highlights.html',
      })

      .state('app.itens.itens', {
        url: '/:category/:inventario',
        params: {
          category: {
            value: '13',
            squash: false
          },
          inventario: {
            value: null,
            squash: true
          }
        },
        resolve: {
          itens: function ($stateParams, inventory, storeList) {
            var itens;

            if ( $stateParams.inventario ) {
              itens = inventory.data.data.TeamPlayerItems;
            } else {
              itens = storeList.data.data.TeamPlayerItems;
            }

            return itens.filter(function (item) {
              return item.Category === parseInt($stateParams.category);
            })

          }
        },
        templateUrl: 'itens-itens.html',
        controller: function (itens) {
          this.itens = itens;
        },
        controllerAs: '$ctrl'
      });

  });
