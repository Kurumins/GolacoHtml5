'use strict';
angular.module('app')
  .config(structureRoutesConfig);

// function structureController (/*ItensService, inventory, storeList*/) {

//   var vm = this;

//   // vm.inventory = inventory;
//   // vm.storeList = storeList;

//   // vm.saleItens = []
//   //   .concat( vm.storeList.TeamPlayerItems || [] )
//   //   .concat( vm.storeList.TrainingCenterItems || [] )
//   //   .filter(function (item) {
//   //     return item.SalePrice !== 0;
//   //   });

// }

function structureRoutesConfig ($stateProvider) {

  $stateProvider

    .state('app.structure', {
      url: '/structure',
      abstract: '.stadium',
      templateUrl: 'structure.html',
      // controller: structureController,
      // controllerAs: '$structureCtrl'
    })

    .state('app.structure.stadium', {
      url: '/stadium',
      templateUrl: 'structure-stadium.html',
      resolve: {
        stadiumManage: function (StructureService) {
          return StructureService.stadiumManage()
            .then( function (stadiumManage) {
              stadiumManage.Stadium.CapacitySlots = stadiumManage.Stadium.CampacitySlots;
              return stadiumManage;
            })
        }
      },
      controller: function (stadiumManage) {
        this.stadium = stadiumManage.Stadium;
      },
      controllerAs: '$ctrl'
    })

    .state('app.structure.training-center', {
      url: '/training-center',
      template: 'structure-training-center.html',
    })

    .state('app.structure.medical-center', {
      url: '/medical-center',
      template: 'structure-medical-center.html',
    })

    .state('app.structure.junior-center', {
      url: '/junior-center',
      template: 'structure-junior-center.html',
    })

    // .state('app.itens.itens', {
    //   url: '/:inventario/:centro/:category',
    //   params: {
    //     category: {
    //       value: '13',
    //       squash: false
    //     },
    //     inventario: {
    //       value: 'loja',
    //       squash: false
    //     },
    //     centro: {
    //       value: null,
    //       squash: true
    //     }
    //   },
    //   resolve: {
    //     itens: function ($stateParams, inventory, storeList) {
    //       var data, itens;

    //       if ( $stateParams.inventario === 'inventario' ) {
    //         data = inventory;
    //       } else {
    //         data = storeList;
    //       }

    //       if ( $stateParams.centro === 'centro' ) {
    //         // if (_storeTCItems[i].Category == 1 || _storeTCItems[i].Category == 3)
    //         //   _storeTcDItems.push(_storeTCItems[i]);
    //         // if (_storeTCItems[i].Category == 4 || _storeTCItems[i].Category == 5)
    //         //   _storeTcCItems.push(_storeTCItems[i]);
    //         // if (_storeTCItems[i].Category == 6 || _storeTCItems[i].Category == 7)
    //         //   _storeTcBItems.push(_storeTCItems[i]);
    //         // if (_storeTCItems[i].Category == 8 || _storeTCItems[i].Category == 9)

    //         itens = data.TrainingCenterItems.filter(function (item) {
    //           return {
    //             D: [1, 3],
    //             C: [4, 5],
    //             B: [6, 7],
    //             A: [8, 9]
    //           }[$stateParams.category].indexOf(item.Category) !== -1;
    //         });
    //       } else {
    //         itens = data.TeamPlayerItems.filter(function (item) {
    //           return item.Category === parseInt($stateParams.category);
    //         });
    //       }

    //       return itens;

    //     }
    //   },
    //   templateUrl: 'itens-itens.html',
    //   controller: function (itens) {
    //     this.itens = itens;
    //   },
    //   controllerAs: '$ctrl'
    // });

}
