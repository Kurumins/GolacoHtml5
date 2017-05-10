'use strict';
angular.module('app')
  .controller('FriendlyMatchController', function (FriendlyMatchService, AppService, MatchResult) {

    var vm = this;

    vm.findFriendlyMatches = function (filter) {

      League = [];

      for (var league in filter.League) {
        if (filter.League[league]) {
          League.push(league);
        }
      }

      var newFilter = angular.copy(filter);
      newFilter.League = League.join(';');

      FriendlyMatchService.findFriendlyMatches(newFilter)
        .then(function (friendlyMatches) {
          vm.friendlyMatches = friendlyMatches.Teams;
          vm.me = friendlyMatches.CurrentTeam;
          vm.currentMatch = vm.friendlyMatches[0];
        });

    };

    // findFriendlyMatches({
    //   League: AppService.teamPreview.Serie,
    //   TeamName: '',
    //   Country: 0,
    //   Couch: ''
    // });

    vm.filter = {
      League: [],
      TeamName: '',
      Country: 0,
      Couch: ''
    };
    vm.filter.League[AppService.teamPreview.Serie] = true;

    vm.findFriendlyMatches(vm.filter);

    vm.play = function () {
      MatchResult.open(123123);
    }

  });
