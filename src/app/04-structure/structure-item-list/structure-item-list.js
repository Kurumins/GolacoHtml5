'use strict';
angular.module('app')
  .component('structureItemList', {
    transclude: true,
    templateUrl: 'structure-item-list.html',
    bindings: {
      icon: '@icon'
    },
    controller: function () {
      var vm = this;
      // vm.itenPurchase = ItenPurchase.open;
    },
    controllerAs: '$ctrl'
  });
