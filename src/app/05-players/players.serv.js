'use strict';
angular.module('app')
  .service('TeamPlayerService', function (PostToJs) {

    var vm = this;

    vm.teamPlayerList = function () {
      return PostToJs('TeamPlayer/List');
    };

    vm.teamSpotPrices = function () {
      return PostToJs('Team/GetProPlayerSpotPrices');
    };

    vm.teamPlayerManage = function () {
      return PostToJs('TeamPlayer/Manage');
    };

    vm.healthHistory = function (teamPlayerId) {
      return PostToJs('TeamPlayer/HealthHistory', {
        TeamPlayerId: teamPlayerId
      });
    };

    vm.statistics = function (teamPlayerId) {
      return PostToJs('TeamPlayer/Statistics', {
        TeamPlayerId: teamPlayerId
      });
    };

    vm.history = function (teamPlayerId) {
      return PostToJs('TeamPlayer/History', {
        TeamPlayerId: teamPlayerId
      });
    };

    vm.takeCurrentValue = function (teamPlayerId) {
      return PostToJs('TeamPlayer/TakeCurrentValue', {
        IdTeamPlayer: teamPlayerId
      });
    };

    vm.buyProSpot = function (spot) {
      return PostToJs('Team/BuyProSpot', {
        Spot: spot
      });
    };

  });
