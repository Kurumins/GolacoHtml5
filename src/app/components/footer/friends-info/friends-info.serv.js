'use strict';
angular.module('app')
.service('FriendsInfoService', function (PostToJs) {

  this.getFriendsInfo = function () {
    return PostToJs('friends')
      .then(function (friends) {
        return PostToJs('User/FriendsInfo', {
          ids: friends.friends.map(function (friend) {
            return friend[0];
          })
        });
      });
  };

});

