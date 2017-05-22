'use strict';
angular.module('app')
  .service('ItensService', function (PostToJs) {

    var vm = this;

    vm.inventory = function () {
      return PostToJs('Team/Inventory');
    };

    vm.storeList = function () {
      return PostToJs('Store/List');
    };

    // data[BundleId]:7
    // data[TypeId]:1
    // data[ItemQuantity]:1
    // data[ItemId]:187
    vm.itemPurchase = function (item, qty) {
      return PostToJs('Store/Purchase', {
        TypeId: [1, 3, 4, 5, 6, 7, 8, 9].indexOf(item.Category) === -1 ? 1 : 2,
        ItemQuantity: qty,
        ItemId: item.Id,
        BundleId: item.IdBundle
      });
    };

  });
