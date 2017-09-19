'use strict';
angular.module('app')
  .config(auctionRoutesConfig);

function auctionController ($scope, allBids, myPlayersSold, $interval, AuctionSearch, AuctionService, PlayerAuction) {

  var vm = this;

  vm.myPlayersSold = myPlayersSold.PlayersSelling;
  vm.allBids = allBids.Bids;

  vm.auctionSearch = function () {
    AuctionSearch.open($scope)
      .then(updateBid, updateBid);
  };
  // vm.auctionSearch();

  vm.playerAuction = function (player) {
    PlayerAuction.open(player)
      .then(updateBid, updateBid);
  };
  // vm.playerAuction(allBids.Bids[0]);

  function updateBid() {
    AuctionService.getAllBids()
      .then(function (allBids) {
        vm.allBids = allBids.Bids;
      });
  }

}

function auctionRoutesConfig ($stateProvider) {

  $stateProvider
    .state('app.auction', {
      url: '/auction',
      resolve: {
        myPlayersSold: function (AuctionService) {
          return AuctionService.getMyPlayersSold();
        },
        allBids: function (AuctionService) {
          return AuctionService.getAllBids();
        },
      },
      templateUrl: 'auction.html',
      controller: auctionController,
      controllerAs: '$ctrl'
    });

}
