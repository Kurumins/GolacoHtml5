'use strict';
angular.module('app')
  .service('MainService', function (PostToJs, $window) {

    var vm = this;

    vm.teamSettings = function () {
      return PostToJs('Team/Settings');
    };

    vm.teamTrophyRoom = function () {
      return PostToJs('Team/TrophyRoom', {snId: $window.idSocialNetwork});
    };

    vm.teamStats = function () {
      return PostToJs('Team/Statistics');
    };

  });
