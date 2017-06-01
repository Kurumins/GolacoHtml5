'use strict';
angular.module('app')
  .service('AuctionService', function (PostToJs, $http) {

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

  });
