'use strict';
angular.module('app')
  .component('item', {
    templateUrl: 'item.html',
    bindings: {
      item: '=value'
    },
    controller: function (ItenPurchase) {
      var vm = this;
      // ItenPurchase.open({a: 1});
      vm.itenPurchase = ItenPurchase.open;
    },
    controllerAs: '$ctrl'
  });
