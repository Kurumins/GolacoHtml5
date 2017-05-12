'use strict';
angular.module('app')
  .controller('ItenPurchaseController', function (item) {

    var vm = this;

    vm.item = item;

    // vm.ItenPurchase = ItenPurchase;

    // vm.juniorScouts = function () {
    //   JuniorScouts.open(vm.ItenPurchase.Scouts)
    //     .then(function (scout) {
    //       vm.currentScout = scout;
    //     });
    // };
    // vm.juniorScouts();
    // vm.currentScout = vm.ItenPurchase.Scouts[0];

  })
  .factory('ItenPurchase', function (StructureService, ngDialog) {

    this.open = function (item) {
      ngDialog.openConfirm({
        template: 'item-purchase.html',
        appendClassName: 'ngdialog-item-purchase',
        controller: 'ItenPurchaseController as $ctrl',
        // scope: $scope,
        resolve: {
          item: function () {
            return item;
          }
        },
        // data: item,
        showClose: false
      });
    };

    return this;

  });
