'use strict';
angular.module('app')
  .config(auctionRoutesConfig);

function auctionController (allBids, myPlayersSold) {

  var vm = this;

  vm.allBids = allBids.Bids;
  vm.myPlayersSold = myPlayersSold.PlayersSelling;

}

function auctionRoutesConfig ($stateProvider) {

  $stateProvider
    .state('app.auction', {
      url: '/auction',
      resolve: {
        allBids: function (AuctionService) {
          return AuctionService.getAllBids();
        },
        myPlayersSold: function (AuctionService) {
          return AuctionService.getMyPlayersSold();
        },
      },
      templateUrl: 'auction.html',
      controller: auctionController,
      controllerAs: '$ctrl'
    })

}
