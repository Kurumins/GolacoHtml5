'use strict';
angular.module('app')
  .controller('MoraleRecoveryController', function ($rootScope, $scope, TeamPlayerService, ConfirmPopup, AlertPopup) {

    var vm = this;
    vm.scope = $scope;

    vm.moraleBoost = function (idItem) {
      ConfirmPopup.open('Error.errorTitle', 'PlayerView.MoraleBoostModal')
        .then(function () {
          TeamPlayerService.moraleBoost(idItem)
            .then(function () {
              vm.scope.closeThisDialog();
              AlertPopup.open('Error.errorTitle', 'PlayerView.MoraleRecovered');
              $rootScope.$emit('balanceUpdate');
              $rootScope.$emit('teamPlayerUpdate');
            })
            .catch(function (error) {
              AlertPopup.open('Error.errorTitle', error.Message);
            });
        });
    };

  });
