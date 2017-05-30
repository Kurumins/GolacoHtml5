'use strict';
angular.module('app')
  .service('FriendlyMatchService', function (PostToJs) {

    var vm = this;

    vm.findFriendlyMatches = function (filter) {
      return PostToJs('Match/FindFriendlyMatches', filter);
    };

    vm.scheduleMatch = function (Credit, TeamId, UseItems) {
      return PostToJs('Match/ScheduleMatch', {
        Credit: Credit,
        TeamId: TeamId,
        UseItems: UseItems,
      });
    };

  });
