'use strict';
angular.module('app')
  .controller('AuctionSearchController', function (AuctionService, $interval, moment, PlayerAuction) {

    var vm = this;


    vm.search = function (filter) {
      vm.players = null;
      AuctionService.search(filter)
        .then(function (players) {
          vm.players = players.Players;
          // vm.playerAuction(vm.players[0]);
        });
    }
    // vm.search();

    $interval(function () {}, 1000);

    vm.getMoment = function (date) {
      var diff = moment(date).diff();
      return diff < 0 ? '0:00:00' : moment(diff).utc().format('H:mm:ss');
    }

    vm.playerAuction = PlayerAuction.open;

  })
  .factory('AuctionSearch', function (ngDialog) {

    this.open = function ($scope) {
      return ngDialog.openConfirm({
        template: 'auction-search.html',
        appendClassName: 'ngdialog-auction-search',
        controller: 'AuctionSearchController as $ctrl',
        scope: $scope
        // resolve: {
        // }
      });
    };

    return this;

  });
