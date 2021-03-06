'use strict';
angular.module('app')
  .service('AuctionService', function (PostToJs/*, $http*/) {

    var vm = this;

    vm.getAllBids = function () {
      return PostToJs('Auction/GetAllBidsFromMyTeam');
      // return $http.get('/data/Auction/GetAllBidsFromMyTeam')
      //   .then(function (bids) {
      //     return bids.data.data;
      //   })
    };

    vm.getMyPlayersSold = function () {
      return PostToJs('Auction/GetMyPlayersSold');
    };

    vm.search = function (filters) {
      return PostToJs('Auction/Search', filters);
    };

    vm.playerAuction = function (teamPlayerAuctionId) {
      return PostToJs('Auction/AuctionTeamPlayerScreen', {
        TeamPlayerAuctionId: teamPlayerAuctionId
      });
    };

    vm.bidAuction = function (teamPlayerAuctionId, currentValue, bidValue) {
      return PostToJs('Auction/BidAuction', {
        TeamPlayerAuctionId: teamPlayerAuctionId,
        CurrentValue: currentValue,
        BidValue: bidValue
      });
    };

  });
