'use strict';
angular.module('app')
  .component('auctionPlayer', {
    templateUrl: 'auction-player.html',
    bindings: {
      player: '='
    }
  });
