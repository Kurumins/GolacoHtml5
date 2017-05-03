'use strict';
angular.module('app')
  .service('MainService', function (PostToJs) {

    var vm = this;

    vm.teamSettings = function () {
      return PostToJs('/Team/Settings', 'team_settings_callback');
    };

    vm.teamTrophyRoom = function () {
      return PostToJs('/data/Team/TrophyRoom', 'get_team_trophyhall');
    };

    vm.teamStats = function () {
      return PostToJs('/data/Team/Statistics');
    };

  });
