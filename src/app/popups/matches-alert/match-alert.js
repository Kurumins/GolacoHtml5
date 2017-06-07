'use strict';
angular.module('app')
  .controller('MatchAlertController', function ($scope, matches, MatchResult, MatchResultService) {

    var vm = this;

    vm.matches = matches;
    vm.scope = $scope;

    vm.matchResult = function (match) {

      MatchResult.open(match.Id)
        .then(setMatchWatched, setMatchWatched);

      function setMatchWatched () {
        MatchResultService.setMatchWatched(match.Id);
        vm.matches.splice(vm.matches.indexOf(match), 1);

        if ( vm.matches.length === 0 ) {
          vm.scope.closeThisDialog();
        }
      }
    };

    vm.ignoreAllMatches = function () {
      MatchResultService.ignoreAllMatches();
      vm.scope.closeThisDialog();
    };

  })
  .factory('MatchAlert', function (ngDialog) {

    this.open = function (matches) {
      return ngDialog.open({
        template: 'matches-alert.html',
        appendClassName: 'ngdialog-matches-alert',
        controller: 'MatchAlertController as $ctrl',
        // scope: $scope,
        resolve: {
          matches: function () {
            return matches;
          }
        },
        showClose: false,
        closeByEscape: false,
        closeByDocument: false,
      });
    };

    return this;

  });
