'use strict';
angular.module('app')
  .controller('PlayerManagerController', function ($scope, teamPlayerManage, currentPlayer, ngDialog, TeamPlayerService) {

    var vm = this;

    var players = teamPlayerManage.TeamPlayers.filter(function (player) {
      return player.TeamPlayerType === 1;
    });

    // vm.teamPlayerManage = teamPlayerManage;
    for (var i = 0; i < players.length; i++) {

      var player = players[i];

      if (player.Id == currentPlayer) {

        updateCurrentPlayer(player);

        break;

      }
    }

    function updateCurrentPlayer(player) {

      player.effects = []
        .concat(player.CleatsItem && player.CleatsItem.Effects || [])
        .concat(player.ShirtItem && player.ShirtItem.Effects || [])
        .concat(player.ShirtItem && player.ShirtItem.Effects || []);

      vm.currentPlayer = player;

    }

    vm.nextPlayer = function () {
      updateCurrentPlayer(players[ (players.indexOf(vm.currentPlayer)+1) % players.length ]);
    };

    vm.prevPlayer = function () {
      updateCurrentPlayer(players[ (players.indexOf(vm.currentPlayer)-1 + players.length) % players.length ]);
    };

    vm.getEffectModifier = function (skill) {

      var total = 0;

      for (var i = 0; i < vm.currentPlayer.effects.length; i++) {
        if ( vm.currentPlayer.effects[i].IdTeamPlayerSkill === skill ) {
          total += (vm.currentPlayer.effects[i].Effect);
        }
      }

      return total;

    }

    vm.healthHistory = function (playerId) {
      ngDialog.open({
        template: 'player-manager-health-history.html',
        appendClassName: 'ngdialog-player-manager-health-history',
        // controller: 'healthHistoryController as $ctrl',
        scope: $scope,
        resolve: {
          healthHistory: function () {
            return TeamPlayerService.healthHistory(playerId)
              .then(function (result) {
                return result.data.data;
              });
          }
        },
        controller: function (healthHistory) {
          this.healthHistory = healthHistory.HealthHistory;
        },
        controllerAs: '$historyCtrl'
      });
    };

    vm.statistics = function (playerId) {
      ngDialog.open({
        template: 'player-manager-statistics.html',
        appendClassName: 'ngdialog-player-manager-statistics',
        // controller: 'healthHistoryController as $ctrl',
        scope: $scope,
        resolve: {
          statistics: function (TeamPlayerService) {
            return TeamPlayerService.statistics(playerId)
              .then(function (result) {
                return result.data.data;
              });
          }
        },
        controller: function (statistics) {
          this.statistics = statistics;
        },
        controllerAs: '$statisticsCtrl'
      });
    };

    vm.history = function (playerId) {
      ngDialog.open({
        template: 'player-manager-history.html',
        appendClassName: 'ngdialog-player-manager-history',
        // controller: 'healthHistoryController as $ctrl',
        scope: $scope,
        resolve: {
          history: function () {
            return TeamPlayerService.history(playerId)
              .then(function (result) {
                return result.data.data.History;
              });
          }
        },
        controller: function (history) {
          this.history = history;
        },
        controllerAs: '$historyCtrl'
      });
    };

    vm.sellPlayer = function () {
      ngDialog.openConfirm({
        template: 'player-manager-sell-player.html',
        resolve: {
          currentValue: function () {
            var currentPlayer = vm.currentPlayer;
            return TeamPlayerService.takeCurrentValue(currentPlayer.playerId)
              .then(function (result) {
                return currentPlayer.CurrentValue = result.data.data.CurrentValue;
              });
          }
        },
        scope: $scope
      })
        .then(function () {
        }, function () {
        });
    };

    // vm.sellPlayer();

  });
