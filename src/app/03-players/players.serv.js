'use strict';
angular.module('app')
  .service('TeamPlayerService', function ($http) {

    var vm = this;

    vm.teamPlayerList = function () {
      return $http.get('/data/TeamPlayer/List');
    };

    vm.teamSpotPrices = function () {
      return $http.get('/data/Team/GetProPlayerSpotPrices');
    };

    vm.teamPlayerManage = function () {
      return $http.get('/data/TeamPlayer/Manage');
    };

    vm.healthHistory = function () {
      return $http.get('/data/TeamPlayer/HealthHistory');
    };

  });
