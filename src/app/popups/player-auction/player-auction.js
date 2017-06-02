'use strict';
angular.module('app')
  .controller('PlayerAuctionController', function ($rootScope, $scope, player, ngDialog, TeamPlayerService, AlertPopup, ConfirmPopup, PlayerItemEquip) {

    var vm = this;

    vm.player = player;
    vm.currentPlayer = player;

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


  })
  .factory('PlayerAuction', function (ngDialog, TeamPlayerService) {

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
          }
        },
      });
    };

    return this;

  });
