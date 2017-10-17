'use strict';
angular.module('app')
  .service('FriendlyMatchService', function (PostToJs) {

    var vm = this;

    vm.findFriendlyMatches = function (filter) {
      // filter.SocialId = 100003981710211;
      return PostToJs('Match/FindFriendlyMatches', filter);
    };

    vm.scheduleMatch = function (credit, teamId, useItems) {
      return PostToJs('Match/ScheduleMatch', {
        Credit: credit,
        TeamId: teamId,
        UseItems: useItems,
      });
    };

  });
