'use strict';
angular.module('app')
  .controller('PlayerAuctionController', function ($scope, player, playerAuction, ngDialog, TeamPlayerService, AlertPopup, ConfirmPopup, $interval, AuctionService) {

    var vm = this;

    vm.currentPlayer = vm.player = player;;
    vm.playerAuction = playerAuction;

    vm.bids = [
      {label:'5', value:5},
      {label:'10', value:10},
      {label:'15', value:15},
      {label:'20', value:20}
    ];

    vm.healthHistory = function () {
      ngDialog.open({
        template: 'player-manager-health-history.html',
        appendClassName: 'ngdialog-player-manager-health-history',
        // controller: 'healthHistoryController as $ctrl',
        scope: $scope,
        resolve: {
          healthHistory: function () {
            return TeamPlayerService.healthHistory(vm.player.Id)
              .then(function (result) {
                return vm.player.healthHistory = result.HealthHistory;
              });
          }
        },
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
            return TeamPlayerService.statistics(vm.player.Id)
              .then(function (result) {
                return vm.player.statistics = result;
              });
          }
        },
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
      });
    };

    vm.refresh = function () {
      AuctionService.playerAuction(vm.player.TeamPlayerAuctionId)
        .then(function (playerAuction) {
          vm.playerAuction = playerAuction;
        })
    }

    $interval(function () {}, 1000);

    vm.getMoment = function () {
      var diff = moment(vm.player.LimitDate).diff();
      if (diff < 0) {
        vm.closed = true;
      }
      return diff < 0 ? '0:00:00' : moment(diff).utc().format('H:mm:ss');
    };


  })
  .factory('PlayerAuction', function (ngDialog, AuctionService) {

    this.open = function (player) {

      return ngDialog.open({
        template: 'player-auction.html',
        appendClassName: 'ngdialog-player-manager ngdialog-player-auction',
        controller: 'PlayerAuctionController as $ctrl',
        // scope: $scope,
        resolve: {
          // teamPlayerManage: function () {
          //   return TeamPlayerService.teamPlayerManage();
          //     // .then(function (result) {
          //     //   return result.data.data;
          //     // });
          // },
          player: function () {
            return player;
          },
          playerAuction: function () {
            return AuctionService.playerAuction(player.TeamPlayerAuctionId);
          }
        },
      });
    };

    return this;

  });
