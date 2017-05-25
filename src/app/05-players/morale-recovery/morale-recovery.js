'use strict';
angular.module('app')
  .controller('MoraleRecoveryController', function ($rootScope, $scope, TeamPlayerService, ConfirmPopup, AlertPopup) {

    var vm = this;

    vm.moraleBoost = function (idItem) {
      ConfirmPopup.open('Atenção', 'Deseja recuperar a moral de seus jogadores?')
        .then(function () {
          TeamPlayerService.moraleBoost(idItem)
            .then(function () {
              $scope.closeThisDialog();
              AlertPopup.open('Atenção', 'Moral recuperada.');
              $rootScope.$emit('balanceUpdate');
              $rootScope.$emit('teamPlayerUpdate');
            })
            .catch(function (error) {
              AlertPopup.open('Atenção', error.Message);
            });
        });
    };

  });
