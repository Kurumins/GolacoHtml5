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

  });
