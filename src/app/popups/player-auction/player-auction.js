'use strict';
angular.module('app')
  .controller('PlayerAuctionController', function ($scope, player, playerAuction, ngDialog, TeamPlayerService, AlertPopup, ConfirmPopup, $interval, AuctionService, moment) {

    var vm = this;

    vm.currentPlayer = vm.player = player;
    vm.playerAuction = playerAuction;

    vm.bids = [5, 10, 15, 20];

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
                result.CurrentTeamStatistics = result.GlobalStatistics;
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
          vm.player.LimitDate = playerAuction.LimitDate;
        });
    };

    $interval(function () {}, 1000);

    vm.getMoment = function () {
      var diff = moment(vm.player.LimitDate).diff();
      if (diff < 0) {
        vm.closed = true;
      }
      return diff < 0 ? '0:00:00' : moment(diff).utc().format('H:mm:ss');
    };

    vm.bidAuction = function () {

      ConfirmPopup.open('AuctionScreen.lblTitle', 'AuctionScreen.' + (vm.playerAuction.IsFirstBid ? 'msgFirstBid;t' + vm.playerAuction.FirstBidCost : 'msgPlayerDoABidConfirm') )
        .then(function () {
          var currentValue = vm.playerAuction.FinancialHist[0] && vm.playerAuction.FinancialHist[0].Money || vm.playerAuction.InitialValue;
          return AuctionService.bidAuction(vm.player.TeamPlayerAuctionId, currentValue, vm.bid);
        })
        .catch(function (error) {
          AlertPopup.open('Common.error', 'Error.' + error.Message);
        })
        .finally(function () {
          vm.refresh();
        });
    };


  })
  .factory('PlayerAuction', function (ngDialog, AuctionService) {

    this.open = function (player) {

      return ngDialog.openConfirm({
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
