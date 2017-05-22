'use strict';
angular.module('app')
  .component('item', {
    templateUrl: 'item.html',
    bindings: {
      item: '=value'
    },
    controller: function (ItenPurchase, ConfirmPopup) {
      var vm = this;
      // ItenPurchase.open({a: 1});
      vm.itenPurchase = ItenPurchase.open;

      vm.sellItem = function () {
        ConfirmPopup.open({
          title: 'Atenção',
          content: 'Deseja realmente vender este item?'
        })
          .then(function () {

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
