'use strict';
angular
  .module('app')
  .component('balance', {
    templateUrl: 'balance.html',
    controller: function ($rootScope, BalanceService) {

      var vm = this;

      vm.buyMoney = BalanceService.buyMoney;

      balanceUpdate();

      var onBalanceUpdate = $rootScope.$on('balanceUpdate', function () {
        balanceUpdate();
      });
      $rootScope.$on('$destroy', onBalanceUpdate);

      function balanceUpdate () {
        BalanceService.headerUserData()
          .then(function (result) {
            vm.HeaderData = result.HeaderData;
          });
      }

    },
    controllerAs: '$ctrl'
  });
