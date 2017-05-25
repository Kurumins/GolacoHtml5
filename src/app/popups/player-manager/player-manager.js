'use strict';
angular.module('app')
  .controller('PlayerManagerController', function ($rootScope, $scope, teamPlayerManage, currentPlayer, ngDialog, TeamPlayerService, AlertPopup, ConfirmPopup) {

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
            return TeamPlayerService.healthHistory(vm.currentPlayer.Id)
              .then(function (result) {
                return vm.currentPlayer.healthHistory = result.HealthHistory;
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
            return TeamPlayerService.statistics(vm.currentPlayer.Id)
              .then(function (result) {
                return vm.currentPlayer.statistics = result;
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
            return TeamPlayerService.history(vm.currentPlayer.Id)
              .then(function (result) {
                return vm.currentPlayer.history = result.History;
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
            return TeamPlayerService.takeCurrentValue(vm.currentPlayer.Id)
              .then(function (result) {
                return currentPlayer.CurrentValue = result.CurrentValue;
              });
          }
        },
        scope: $scope
      })
        .then(function () {
          return TeamPlayerService.startAuction(vm.currentPlayer.Id);
        }, function () {
        })
        .then(function () {
          $scope.closeThisDialog();
          AlertPopup.open('Atenção', 'msgPlayerInAcutionSuccess');
          $rootScope.$emit('teamPlayerUpdate');
          $rootScope.$emit('balanceUpdate');
        })
        .catch(function (error) {
          AlertPopup.open('Atenção', error.Message);
        });
    };
    // vm.sellPlayer();

    $scope.$watch('$ctrl.currentPlayer.Salary', function(newValue, oldValue) {
      // debugger;
      ( newValue < oldValue
        ? ConfirmPopup.open('salaryChangeDownConfirmTitle', 'salaryChangeDownConfirmMessage')
        : ConfirmPopup.open('salaryChangeUpConfirmTitle', 'salaryChangeUpConfirmMessage')
      )
        .then(function () {

        });
    });

  });
