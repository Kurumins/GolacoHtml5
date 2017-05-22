'use strict';
angular.module('app')
  .component('item', {
    templateUrl: 'item.html',
    bindings: {
      item: '=value'
    },
    controller: function ($scope, ItenPurchase, ConfirmPopup, ItensService, AlertPopup) {
      var vm = this;
      // ItenPurchase.open({a: 1});
      vm.itenPurchase = ItenPurchase.open;

      vm.sellItem = function () {
        ConfirmPopup.open({
          title: 'Atenção',
          content: 'Deseja realmente vender este item?'
        })
          .then(function () {
            // debugger;
            ItensService.sellEquip(vm.item)
              .then(function () {
                // $scope.confirm();
                AlertPopup.open('Atenção', 'Item vendido com sucesso.');
                // ItensService.inventory()
                //   .then(function (inventory) {
                    $scope.$emit('inventoryUpdate');
                  // });
              })
              .catch(function (error) {
                AlertPopup.open('Atenção', error.Message);
              });
          });
      };

      vm.discartItem = function () {
        ConfirmPopup.open({
          title: 'Atenção',
          content: 'Deseja realmente descartar este item?'
        })
          .then(function () {

          });
      };

    },
    controllerAs: '$ctrl'
  });
