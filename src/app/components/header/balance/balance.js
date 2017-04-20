'use strict';
angular
  .module('app')
  .component('balance', {
    templateUrl: 'balance.html',
    controller: function ($scope, BalanceService) {
      BalanceService.headerUserData()
        .then(function (result) {
          $scope.HeaderData = result.data.data.HeaderData;
        });
    }
  });
