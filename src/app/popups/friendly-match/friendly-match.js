'use strict';
angular.module('app')
  .controller('FriendlyMatchController', function ($rootScope, FriendlyMatchService, AppService, MatchResult, ngDialog) {

    var vm = this;

    vm.findFriendlyMatches = function (filter) {

      var League = [];

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

    vm.filter = {
      League: [],
      TeamName: '',
      Country: 0,
      Couch: ''
    };
    vm.filter.League[AppService.teamPreview.Serie] = true;

    vm.findFriendlyMatches(vm.filter);

    vm.play = function (ngDialogId) {

      // ngdialog && ngDialog.close(ngdialog);

      var deregisterListener = $rootScope.$on('ngDialog.opened', function (/*e, $dialog*/) {
        deregisterListener();
        ngDialogId && ngDialog.close(ngDialogId);
      });

      MatchResult.open(72014544);

    };

  });
