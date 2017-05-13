'use strict';
angular
  .module('app')
  .component('friendsInfo', {
    templateUrl: 'friends-info.html',
    controller: function (FriendsInfoService) {

      var vm = this;

      // vm.buyMoney = BalanceService.getFriendsInfo();

      FriendsInfoService.getFriendsInfo()
        .then(function (friendsInfo) {
          vm.friendsInfo = friendsInfo.Friends.reverse();
        });

    }
  });
