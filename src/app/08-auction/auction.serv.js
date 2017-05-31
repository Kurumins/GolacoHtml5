'use strict';
angular.module('app')
  .service('AuctionService', function (PostToJs) {

    var vm = this;

    vm.getAllBids = function () {
      return PostToJs('Auction/GetAllBidsFromMyTeam');
    };


    vm.getMyPlayersSold = function () {
      return PostToJs('Auction/GetMyPlayersSold');
    };

  });
