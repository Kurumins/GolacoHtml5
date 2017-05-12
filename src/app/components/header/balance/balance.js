'use strict';
angular
  .module('app')
  .component('balance', {
    templateUrl: 'balance.html',
    controller: function ($scope, BalanceService) {

      var vm = this;

      vm.buyMoney = BalanceService.buyMoney;

      BalanceService.headerUserData()
        .then(function (result) {
          $scope.HeaderData = result.HeaderData;
        });

    }
  });
