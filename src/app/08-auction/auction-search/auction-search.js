'use strict';
angular.module('app')
  .controller('AuctionSearchController', function (AuctionService) {

    var vm = this;

    AuctionService.search()
      .then(function (players) {
        vm.players = players.Players;
      });

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
