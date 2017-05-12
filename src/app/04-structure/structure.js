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
            });
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
      templateUrl: 'junior-center.html',
      resolve: {
        juniorPreview: function (StructureService) {
          return StructureService.juniorPreview();
        }
      },
      controller: 'JuniorCenterController as $ctrl'
    });

}
