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

      if (player.Id === currentPlayer) {

        updateCurrentPlayer(player);

        break;

      }
    }

    function updateCurrentPlayer (player) {

      player.effects = []
        .concat(player.CleatsItem && player.CleatsItem.Effects || [])
        .concat(player.ShirtItem && player.ShirtItem.Effects || [])
        .concat(player.ShirtItem && player.ShirtItem.Effects || []);

      vm.currentPlayer = player;

    }

    vm.nextPlayer = function () {
      updateCurrentPlayer(players[ (players.indexOf(vm.currentPlayer) + 1) % players.length ]);
    };

    vm.prevPlayer = function () {
      updateCurrentPlayer(players[ (players.indexOf(vm.currentPlayer) - 1 + players.length) % players.length ]);
    };

    vm.getEffectModifier = function (skill) {

      var total = 0;

      for (var i = 0; i < vm.currentPlayer.effects.length; i++) {
        if ( vm.currentPlayer.effects[i].IdTeamPlayerSkill === skill ) {
          total += (vm.currentPlayer.effects[i].Effect);
        }
      }

      return total;

    };

    vm.healthHistory = function () {
      ngDialog.open({
        template: 'player-manager-health-history.html',
        appendClassName: 'ngdialog-player-manager-health-history',
        // controller: 'healthHistoryController as $ctrl',
        scope: $scope,
        resolve: {
          healthHistory: function () {
            return TeamPlayerService.healthHistory(currentPlayer.playerId)
              .then(function (result) {
                return vm.currentPlayer.healthHistory = result.data.data.HealthHistory;
              });
          }
        },
        // controller: function (healthHistory) {
        //   var vm = this;
        //   vm.healthHistory = healthHistory.HealthHistory;
        // },
        // controllerAs: '$historyCtrl'
      });
    };

    vm.statistics = function () {
      ngDialog.open({
        template: 'player-manager-statistics.html',
        appendClassName: 'ngdialog-player-manager-statistics',
        // controller: 'healthHistoryController as $ctrl',
        scope: $scope,
        resolve: {
          statistics: function () {
            return TeamPlayerService.statistics(currentPlayer.playerId)
              .then(function (result) {
                return vm.currentPlayer.statistics = result.data.data;
              });
          }
        },
        // controller: function (statistics) {
        //   var vm = this;
        //   vm.statistics = statistics;
        // },
        // controllerAs: '$statisticsCtrl'
      });
    };

    vm.history = function () {
      ngDialog.open({
        template: 'player-manager-history.html',
        appendClassName: 'ngdialog-player-manager-history',
        // controller: 'healthHistoryController as $ctrl',
        scope: $scope,
        resolve: {
          history: function () {
            return TeamPlayerService.history(currentPlayer.playerId)
              .then(function (result) {
                return vm.currentPlayer.history = result.data.data.History;
              });
          }
        },
        // controller: function (history) {
        //   var vm = this;
        //   vm.history = history;
        // },
        // controllerAs: '$historyCtrl'
      });
    };

    vm.sellPlayer = function () {
      ngDialog.openConfirm({
        template: 'player-manager-sell-player.html',
        appendClassName: 'ngdialog-player-manager-sell-player',
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
