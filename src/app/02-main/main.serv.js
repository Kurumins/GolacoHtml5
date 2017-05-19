'use strict';
angular.module('app')
  .service('MainService', function ($http) {

    var vm = this;

    vm.teamSettings = function () {
      return $http.get('/data/Team/Settings');
    };

    vm.teamTrophyRoom = function () {
      return $http.get('/data/Team/TrophyRoom');
    };

    vm.teamStats = function () {
      return $http.get('/data/Team/Statistics');
    };

  });
