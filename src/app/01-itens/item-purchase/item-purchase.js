'use strict';
angular.module('app')
  .controller('ItenPurchaseController', function ($rootScope, $scope, item, ItensService, AlertPopup) {

    var vm = this;

    vm.item = item;
    vm.scope = $scope;

    vm.confirm = function (qty) {
      ItensService.itemPurchase(item, qty)
        .then(function () {
          vm.scope.confirm();
          AlertPopup.open('Aviso', 'Item adquirido com sucesso.');
          $rootScope.$emit('inventoryUpdate');
          $rootScope.$emit('balanceUpdate');
        })
        .catch(function (error) {
          AlertPopup.open('Atenção', error.Message);
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
