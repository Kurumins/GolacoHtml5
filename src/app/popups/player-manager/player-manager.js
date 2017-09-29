'use strict';
angular.module('app')
  .controller('PlayerManagerController', function ($rootScope, $scope, teamPlayerManage, currentPlayer, ngDialog, TeamPlayerService, AlertPopup, ConfirmPopup, PlayerItemEquip) {

    var vm = this;
    vm.scope = $scope;

    var players = teamPlayerManage.TeamPlayers.filter(function (player) {
      return player.TeamPlayerType === 1;
    });

    // vm.teamPlayerManage = teamPlayerManage;
    vm.changeNamePrice = teamPlayerManage.ChangeNamePrice;

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
        .concat(player.ShortItem && player.ShortItem.Effects || [])
        .concat(player.ShirtItem && player.ShirtItem.Effects || []);

      vm.currentPlayer = player;

      vm.newSalary = vm.currentPlayer.Salary;

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
      // ngDialog.openConfirm({
      //   template: 'player-manager-sell-player.html',
      //   appendClassName: 'ngdialog-player-manager-sell-player',
      //   resolve: {
      //     currentValue: function () {
      //       var currentPlayer = vm.currentPlayer;
      //       return TeamPlayerService.takeCurrentValue(vm.currentPlayer.Id)
      //         .then(function (result) {
      //           return currentPlayer.CurrentValue = result.CurrentValue;
      //         });
      //     }
      //   },
      //   scope: $scope
      // })
      TeamPlayerService.takeCurrentValue(vm.currentPlayer.Id)
        .then(function (result) {
          return ConfirmPopup.open('Error.errorTitle', 'AuctionScreen.msgPlayerInAcutionConfirm;$'+result.CurrentValue);
        })
        .then(function () {
          TeamPlayerService.startAuction(vm.currentPlayer.Id)
            .then(function () {
              vm.scope.closeThisDialog();
              AlertPopup.open('Error.errorTitle', 'AuctionScreen.msgPlayerInAcutionSuccess');
              $rootScope.$emit('teamPlayerUpdate');
              $rootScope.$emit('balanceUpdate');
            })
            .catch(function (error) {
              AlertPopup.open('Error.errorTitle', error.Message);
            });
        }, function () {
        });
    };
    // vm.sellPlayer();

    vm.salaryChanged = function (newSalary) {

      var confirmPopup;

      if ( newSalary < vm.currentPlayer.Salary ) {
        confirmPopup = ConfirmPopup.open('PlayerDetail.salaryChangeDownConfirmTitle', 'PlayerDetail.salaryChangeDownConfirmMessage');
      } else if ( newSalary > vm.currentPlayer.Salary ) {
        confirmPopup = ConfirmPopup.open('PlayerDetail.salaryChangeUpConfirmTitle', 'PlayerDetail.salaryChangeUpConfirmMessage');
      } else {
        return;
      }

      confirmPopup
        .then(function () {
          return TeamPlayerService.changeSalary(vm.currentPlayer.Id, newSalary);
        }, function () {
          vm.newSalary = vm.currentPlayer.Salary;
        })
        .then(function () {
          vm.currentPlayer.Salary = vm.newSalary;
        });

    };

    var slots = {
      1: 'ShirtItem',
      2: 'ShortItem',
      3: 'CleatsItem'
    };

    vm.playerItemEquip = function (slot) {
      PlayerItemEquip.open(slot)
        .then(function (item) {
          TeamPlayerService.setTeamPlayerItem(vm.currentPlayer.Id, slot, item.Id)
            .then(function () {
              $rootScope.$emit('teamPlayerUpdate');

              vm.currentPlayer[slots[slot]] = item;

              vm.currentPlayer.effects = []
                .concat(vm.currentPlayer.CleatsItem && vm.currentPlayer.CleatsItem.Effects || [])
                .concat(vm.currentPlayer.ShortItem && vm.currentPlayer.ShortItem.Effects || [])
                .concat(vm.currentPlayer.ShirtItem && vm.currentPlayer.ShirtItem.Effects || []);

              // $timeout(function () {
              // });
            });
        });
    };

    vm.changePlayerName = function () {
      ngDialog.openConfirm({
        template: 'player-manager-change-name.html',
        appendClassName: 'ngdialog-change-player-name',
        scope: $scope,
      })
        .then(function (newName) {
          ConfirmPopup.open('Error.errorTitle', 'PlayerDetail.confirmNameChange;n' + vm.changeNamePrice)
            .then(function () {
              return TeamPlayerService.changeName(vm.currentPlayer.Id, newName);
            })
            .then(function (result) {
              vm.currentPlayer.Name = result.NewName;
              AlertPopup.open('Error.errorTitle', 'PlayerDetail.nameChanged');
              // $scope.closeThisDialog();
              $rootScope.$emit('teamPlayerUpdate');
              $rootScope.$emit('balanceUpdate');
            })
            .catch(function function_name(error) {
              AlertPopup.open('Error.errorTitle', 'Error.' + error.Message);
            });
        });
    };

    vm.updateShirtNumber = function () {
      ngDialog.openConfirm({
        template: 'player-manager-change-number.html',
        appendClassName: 'ngdialog-change-player-number',
        scope: $scope,
      })
        .then(function (shirtNumber) {
          TeamPlayerService.updateShirtNumber(vm.currentPlayer.Id, shirtNumber)
            .then(function (result) {
              vm.currentPlayer.ShirtNumber = shirtNumber;
              AlertPopup.open('Error.errorTitle', 'Common.lblNumberChanged');
              // $scope.closeThisDialog();
              $rootScope.$emit('teamPlayerUpdate');
              // $rootScope.$emit('balanceUpdate');
            })
            .catch(function function_name(error) {
              AlertPopup.open('Error.errorTitle', 'Error.' + error.Message);
            });
        })
    };

    vm.unsetTeamPlayerItem = function (slot) {
      ConfirmPopup.open('Error.errorTitle', 'PlayerDetail.confirmRemove;n' + vm.changeNamePrice)
        .then(function () {
          return TeamPlayerService.unsetTeamPlayerItem(vm.currentPlayer.Id, slot);
        })
        .then(function (result) {
          vm.currentPlayer[slots[slot]] = null;

          vm.currentPlayer.effects = []
            .concat(vm.currentPlayer.CleatsItem && vm.currentPlayer.CleatsItem.Effects || [])
            .concat(vm.currentPlayer.ShortItem && vm.currentPlayer.ShortItem.Effects || [])
            .concat(vm.currentPlayer.ShirtItem && vm.currentPlayer.ShirtItem.Effects || []);

          AlertPopup.open('Error.errorTitle', 'TrainingCenterPreview.unequipMsg');
          $rootScope.$emit('teamPlayerUpdate');
        })
        .catch(function function_name(error) {
          AlertPopup.open('Error.errorTitle', 'Error.' + error.Message);
        });
    };

  });
