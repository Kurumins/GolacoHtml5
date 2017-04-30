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

  vm.extraPlayer();

}
