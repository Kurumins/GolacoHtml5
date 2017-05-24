'use strict';
angular
  .module('app')
  .component('balance', {
    templateUrl: 'balance.html',
    controller: function ($rootScope, BalanceService) {

      var vm = this;

      vm.buyMoney = BalanceService.buyMoney;

      balanceUpdate();

      $rootScope.$on('balanceUpdate', function (event) {
        balanceUpdate();
      });

      function balanceUpdate() {
        BalanceService.headerUserData()
          .then(function (result) {
            vm.HeaderData = result.HeaderData;
          });
      }

    },
    controllerAs: '$ctrl'
  });
