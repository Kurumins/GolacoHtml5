'use strict';
angular.module('app')
.service('FriendsInfoService', function (PostToJs) {

  this.getFriendsInfo = function () {
    return PostToJs('User/FriendsInfo'); //friends-info
  };

});

