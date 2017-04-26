'use strict';
angular.module('app')
  .config(routesConfig);

function itensController (ItensService, inventory, storeList) {

  var vm = this;

  vm.inventory = inventory.data.data;
  vm.storeList = storeList.data.data;

}

function routesConfig ($stateProvider) {

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
      controller: itensController,
      controllerAs: '$itensCtrl'
    })

    .state('app.itens.destaques', {
      url: '',
      templateUrl: 'itens-highlights.html',
    })

    .state('app.itens.itens', {
      url: '/:inventario/:centro/:category',
      params: {
        category: {
          value: '13',
          squash: false
        },
        inventario: {
          value: 'loja',
          squash: false
        },
        centro: {
          value: null,
          squash: true
        }
      },
      resolve: {
        itens: function ($stateParams, inventory, storeList) {
          var data, itens;

          if ( $stateParams.inventario === 'inventario' ) {
            data = inventory.data.data;
          } else {
            data = storeList.data.data;
          }

          if ( $stateParams.centro === 'centro' ) {
            itens = data.TrainingCenterItems.filter(function (item) {
              return item.League === $stateParams.category;
            });
          } else {
            itens = data.TeamPlayerItems.filter(function (item) {
              return item.Category === parseInt($stateParams.category);
            });
          }

          return itens;

        }
      },
      templateUrl: 'itens-itens.html',
      controller: function (itens) {
        this.itens = itens;
      },
      controllerAs: '$ctrl'
    });

}
