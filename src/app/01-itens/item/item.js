'use strict';
angular.module('app')
  .component('item', {
    templateUrl: 'item.html',
    bindings: {
      item: '=value',
      equip: '=',
      confirm: '=confirm'
    },
    controller: function ($rootScope, ItenPurchase, ConfirmPopup, ItensService, AlertPopup) {
      var vm = this;
      // ItenPurchase.open({a: 1});
      vm.itenPurchase = ItenPurchase.open;

      vm.sellItem = function () {
        ConfirmPopup.open('Atenção', 'Deseja realmente vender este item?')
          .then(function () {
            // debugger;
            ItensService.sellEquip(vm.item)
              .then(function () {
                AlertPopup.open('Atenção', 'Item vendido com sucesso.');
                $rootScope.$emit('inventoryUpdate');
                $rootScope.$emit('balanceUpdate');
              })
              .catch(function (error) {
                AlertPopup.open('Atenção', error.Message);
              });
          });
      };

      vm.discartItem = function () {
        ConfirmPopup.open('Atenção', 'Deseja realmente descartar este item?')
          .then(function () {
            ItensService.sellEquip(vm.item)
              .then(function () {
                AlertPopup.open('Atenção', 'Item descartado com sucesso.');
                $rootScope.$emit('inventoryUpdate');
                $rootScope.$emit('balanceUpdate');
              })
              .catch(function (error) {
                AlertPopup.open('Atenção', error.Message);
              });
          });
      };

      vm.itemConfirm = function () {
        ConfirmPopup.open('Atenção', 'Deseja equipar o item selecionado?')
          .then(function () {
            vm.confirm(vm.item);
          });
      };

    },
    controllerAs: '$ctrl'
  });
