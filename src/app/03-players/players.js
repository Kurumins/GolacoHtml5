'use strict';
angular.module('app')
  .config(routesConfig);

function routesConfig ($stateProvider) {

  $stateProvider
    .state('app.players', {
      url: '/players',
      resolve: {
        teamPlayerList: function (TeamPlayerService) {
          return TeamPlayerService.teamPlayerList();
        },
      },
      templateUrl: 'players.html',
      controller: teamPlayerController,
      controllerAs: '$ctrl'
    });
}

function teamPlayerController ($scope, teamPlayerList, ngDialog) {
  var vm = this;

  vm.teamPlayers = teamPlayerList.data.data;

  vm.teamPlayerType = 1;

  vm.extraPlayer = function () {
    ngDialog.open({
      template: 'extra-player.html',
      appendClassName: 'ngdialog-extra-player',
      controller: 'ExtraPlayerController as $ctrl',
      scope: $scope,
      resolve: {
        teamSpotPrices: function (TeamPlayerService) {
          return TeamPlayerService.teamSpotPrices()
            .then(function (result) {
              return result.data.data;
            });
        }
      },
    });
  };

  vm.moraleRecovery = function () {
    ngDialog.open({
      template: 'morale-recovery.html',
      appendClassName: 'ngdialog-morale-recovery',
      controller: 'MoraleRecoveryController as $moraleCtrl',
      scope: $scope,
      // resolve: {
      //   teamSpotPrices: function (TeamPlayerService) {
      //     return TeamPlayerService.teamSpotPrices()
      //       .then(function (result) {
      //         return result.data.data;
      //       });
      //   }
      // },
    });
  };

  vm.playerManager = function (playerId) {
    ngDialog.open({
      template: 'player-manager.html',
      appendClassName: 'ngdialog-player-manager',
      controller: 'PlayerManagerController as $ctrl',
      scope: $scope,
      resolve: {
        teamPlayerManage: function (TeamPlayerService) {
          return TeamPlayerService.teamPlayerManage()
            .then(function (result) {
              return result.data.data;
            });
        },
        currentPlayer: function () {
          return playerId;
        }
      },
    });
  };

  vm.playerManager(36092807);

}
