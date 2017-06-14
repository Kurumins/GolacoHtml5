'use strict';
angular.module('app')
  .component('structureItem', {
    templateUrl: 'structure-item.html',
    bindings: {
      item: '=item',
      lock: '=lock',
      select: '&onSelect',
      activeValue: '@activeValue'
    },
    controller: function () {
      var vm = this;
      // vm.itenPurchase = ItenPurchase.open;
    },
    controllerAs: '$ctrl'
  });
