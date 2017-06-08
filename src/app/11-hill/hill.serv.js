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

  });
