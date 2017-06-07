'use strict';
angular.module('app')
  .config(auctionRoutesConfig);

function auctionController ($scope, allBids, myPlayersSold, $interval, AuctionSearch) {

  var vm = this;

  vm.myPlayersSold = myPlayersSold.PlayersSelling;
  vm.allBids = allBids.Bids;

  vm.auctionSearch = function () {
    AuctionSearch.open($scope);
  };
  // vm.auctionSearch();

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
