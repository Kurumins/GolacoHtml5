'use strict';
angular.module('app')
  .service('CalendarService', function (PostToJs) {

    var vm = this;

    vm.matchCalendar = function (BeginDate, EndDate, TypeId) {
      return PostToJs('Match/Calendar', {
        BeginDate: BeginDate,
        EndDate: EndDate,
        TypeId: TypeId
      });
    };

    vm.useItemInMatch = function (idMatch, useItems) {
      return PostToJs('Match/CalendarUseItemInMatch', {
        IdMatch: idMatch,
        UseItems: useItems
      });
    };

  });
