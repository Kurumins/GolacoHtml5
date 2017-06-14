'use strict';
angular.module('app')
  .controller('PlayerItemEquipController', function (inventory, category) {
    var vm = this;
    // vm.itens = itens;

    var data, itens;

    data = inventory;

    itens = data.TeamPlayerItems.concat(data.TrainingCenterItems).filter(function (item) {
      return category.indexOf(item.Category) !== -1;
    });

    vm.itens = itens;

  })
  .factory('PlayerItemEquip', function (ngDialog, ItensService) {

    this.openCategory = function (category) {
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
            return category;
          }
        },
      });
    };

    this.open = function (slot) {
      return this.openCategory([[13, 14, 15][slot - 1]]);
    };

    return this;

  });
