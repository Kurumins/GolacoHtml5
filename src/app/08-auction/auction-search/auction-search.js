'use strict';
angular.module('app')
  .controller('AuctionSearchController', function (AuctionService, $interval, moment, PlayerAuction) {

    var vm = this;

    AuctionService.search()
      .then(function (players) {
        vm.players = players.Players;
        PlayerAuction.open(vm.players[0]);
      });

    $interval(function () {}, 1000);

    vm.getMoment = function (date) {
      var diff = moment(date).diff();
      return diff < 0 ? '0:00:00' : moment(diff).utc().format('H:mm:ss');
    }

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
