'use strict';
angular.module('app')
.service('BalanceService', function ($http) {

  this.headerUserData = function () {
    return $http.get('/data/Team/HeaderUserData', {
      // 'socket_id': '215916.7788328',
      // 'channel_name': 'private-1602447546449533',
    });
  };

});
