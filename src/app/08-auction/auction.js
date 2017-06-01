'use strict';
angular.module('app')
  .config(auctionRoutesConfig);

function auctionController (allBids, myPlayersSold, $interval) {

  var vm = this;

  vm.myPlayersSold = myPlayersSold.PlayersSelling;
  vm.allBids = allBids.Bids;

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
    })

}
