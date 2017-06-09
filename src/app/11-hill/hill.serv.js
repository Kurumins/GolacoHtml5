'use strict';
angular.module('app')
  .service('HillService', function (PostToJs) {

    var vm = this;

    vm.preview = function () {
      return PostToJs('Hill/Preview');
    };

    vm.challenge = function (idHill, useItems) {
      return PostToJs('Hill/Challenge', {
        IdHill: idHill,
        UseItems: useItems
      });
    };

    vm.topTeams = function (idHill) {
      return PostToJs('Hill/TopTeams', {
        IdHill: idHill
      });
    };

    vm.bestsMonthly = function (idHill, month, year) {
      return PostToJs('Hill/BestsMonthly', {
        IdHill: idHill,
        Month: month,
        Year: year
      });
    };

    vm.lastMatchs = function (idHill) {
      return PostToJs('Hill/LastMatchs', {
        IdHill: idHill
      });
    };

  });
