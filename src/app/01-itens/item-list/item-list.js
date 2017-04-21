'use strict';
angular
  .module('app')
  .component('itemList', {
    templateUrl: 'item-list.html',
    controller: function (ItensService) {

      var vm = this;

      ItensService.inventory()
        .then(function (result) {
          vm.inventory = result.data.data;
        });

      ItensService.storeList()
        .then(function (result) {
          vm.storeList = result.data.data;
        });

    }
  });
