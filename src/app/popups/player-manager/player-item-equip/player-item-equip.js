'use strict';
angular.module('app')
  .controller('PlayerItemEquipController', function (inventory, category) {
    var vm = this;
    // vm.itens = itens;

    var data, itens;

    // if ( $stateParams.inventario === 'inventario' ) {
      data = inventory;
    // } else {
    //   data = storeList;
    // }

    itens = data.TeamPlayerItems.filter(function (item) {
      return item.Category === category;
    });

    vm.itens = itens

  })
  .factory('PlayerItemEquip', function (ngDialog, ItensService) {

    this.open = function (slot) {
      return ngDialog.openConfirm({
        template: 'player-item-equip.html',
        appendClassName: 'ngdialog-player-item-equip',
        controller: 'PlayerItemEquipController as $ctrl',
        // scope: $scope,
        resolve: {
          inventory: function () {
            return ItensService.inventory();
          },
          category: function () {
            return [13, 14, 15][slot-1];
          }
          // storeList: function (ItensService) {
          //   return ItensService.storeList();
          // },
          // itens: function (inventory/*, storeList*/) {
          //   debugger;
          //   var data, itens;

          //   // if ( $stateParams.inventario === 'inventario' ) {
          //     data = inventory;
          //   // } else {
          //   //   data = storeList;
          //   // }

          //   itens = data.TeamPlayerItems/*.filter(function (item) {
          //     return item.Category === parseInt($stateParams.category);
          //   });*/

          //   return itens;

          // }
        },
      });
    };

    return this;

  });
