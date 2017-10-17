'use strict';
angular.module('app')
  .controller('FriendlyMatchController', function ($rootScope, FriendlyMatchService, AppService, MatchResult, ngDialog, ConfirmPopup, $timeout, $loading, filter) {

    var vm = this;

    vm.useItens = true;

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

    vm.findFriendlyMatches(filter || vm.filter);

    vm.play = function (match) {

      confirmPlay(match.Id)
        .then(function (result) {
          $loading.start('PostToJs');
          $timeout(function () {
            MatchResult.open(result.MatchId);
          }, 15000);
        });

    };

    function confirmPlay (matchId) {
      if ( AppService.user.FriendlyMatchesToday < 3 ) {
        return ConfirmPopup.open('FriendlyMatch.lblScheduleConfirmTitle', 'FriendlyMatch.msgScheduleConfirmTitle')
          .then(function () {
            return FriendlyMatchService.scheduleMatch(0, matchId, vm.useItens);
          });
      } else {
        return ConfirmPopup.open('FriendlyMatch.lblScheduleWithCreditConfirmTitle', 'FriendlyMatch.msgScheduleWithCreditConfirmTitle')
          .then(function () {
            return FriendlyMatchService.scheduleMatch(1, matchId, vm.useItens);
          });
      }
    }

    // MatchResult.open(321612312312312354);

    // function getMatchResult(matchId) {
    //   $timeout(function () {
    //     // $loading.finish('PostToJs');
    //     MatchResult.open(matchId)
    //       .then(function (r) {
    //         console.log(r);
    //       }, function (r) {
    //         console.log(r);
    //         getMatchResult(matchId);
    //       })
    //       .catch(function (r) {
    //         console.log(r);
    //       });

    //   }, 1000);
    // }

  })

  .factory('FriendlyMatch', function (ngDialog) {
    var vm = this;

    vm.open = function (filter) {
      return ngDialog.open({
        template: 'friendly-match.html',
        appendClassName: 'ngdialog-friendly-match',
        controller: 'FriendlyMatchController as $ctrl',
        // scope: $scope,
        resolve: {
          filter: function () {
            return filter;
          }
        }
      });
    };

    return vm;

  });
