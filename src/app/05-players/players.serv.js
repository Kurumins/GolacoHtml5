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

    vm.startAuction = function (teamPlayerId) {
      return PostToJs('Auction/StartAuction', {
        TeamPlayerId: teamPlayerId
      });
    };

    vm.buyProSpot = function (spot) {
      return PostToJs('Team/BuyProSpot', {
        Spot: spot
      });
    };

    vm.moraleBoost = function (idItem) {
      return PostToJs('TeamPlayer/MoraleBoost', {
        IdItem: idItem
      });
    };

    vm.changeSalary = function (teamPlayerId, salaryOption) {
      return PostToJs('TeamPlayer/ChangeSalary', {
        TeamPlayerId: teamPlayerId,
        SalaryOption: salaryOption
      });
    };

    vm.setTeamPlayerItem = function (teamPlayerId, slot, itemId) {
      return PostToJs('TeamPlayer/SetTeamPlayerItem', {
        TeamPlayerId: teamPlayerId,
        Slot: slot,
        ItemId: itemId
      });
    };

    vm.changeName = function (idTeamPlayer, newName) {
      return PostToJs('TeamPlayer/ChangeName', {
        IdTeamPlayer: idTeamPlayer,
        NewName: newName
      });
    };

    vm.updateShirtNumber = function (idTeamPlayer, shirtNumber) {
      return PostToJs('TeamPlayer/UpdateShirtNumber', {
        idTeamPlayer: idTeamPlayer,
        shirtNumber: shirtNumber
      });
    };

  });
