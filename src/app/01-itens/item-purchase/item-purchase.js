'use strict';
angular.module('app')
  .controller('ItenPurchaseController', function ($scope, item, ItensService, AlertPopup) {

    var vm = this;

    vm.item = item;

    vm.confirm = function (qty) {
      ItensService.itemPurchase(item, qty)
        .then(function () {
          $scope.confirm();
          AlertPopup.open('Aviso', 'Item adquirido com sucesso.');
        });
    };

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
