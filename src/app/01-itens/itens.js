'use strict';
angular.module('app')
  .config(itensRoutesConfig);

function itensController (ItensService, inventory, storeList) {

  var vm = this;

  vm.inventory = inventory;
  vm.storeList = storeList;

  vm.saleItens = []
    .concat( vm.storeList.TeamPlayerItems || [] )
    .concat( vm.storeList.TrainingCenterItems || [] )
    .filter(function (item) {
      return item.SalePrice !== 0;
    });

}

function itensRoutesConfig ($stateProvider) {

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
            data = inventory;
          } else {
            data = storeList;
          }

          if ( $stateParams.centro === 'centro' ) {
            // if (_storeTCItems[i].Category == 1 || _storeTCItems[i].Category == 3)
            //   _storeTcDItems.push(_storeTCItems[i]);
            // if (_storeTCItems[i].Category == 4 || _storeTCItems[i].Category == 5)
            //   _storeTcCItems.push(_storeTCItems[i]);
            // if (_storeTCItems[i].Category == 6 || _storeTCItems[i].Category == 7)
            //   _storeTcBItems.push(_storeTCItems[i]);
            // if (_storeTCItems[i].Category == 8 || _storeTCItems[i].Category == 9)

            itens = data.TrainingCenterItems.filter(function (item) {
              return {
                D: [1, 3],
                C: [4, 5],
                B: [6, 7],
                A: [8, 9]
              }[$stateParams.category].indexOf(item.Category) !== -1;
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
