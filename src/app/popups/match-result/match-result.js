'use strict';
angular.module('app')
  .controller('MatchResultController', function (matchData, AppService) {

    var vm = this;

    vm.matchData = matchData.data;

    AppService.getCurrentUploadBadge(vm.matchData.HomeTeam.Id)
      .then(function (badges) {
        vm.matchData.HomeTeam.Badge = badges['Badge90x90'];
        return AppService.getCurrentUploadBadge(vm.matchData.VisitorTeam.Id);
      })
      .then(function (badges) {
        vm.matchData.VisitorTeam.Badge = badges['Badge90x90'];
        // body...
      });

    // var visitor = vm.matchData.VisitorTeam.Goals;

    var me, adversary;

    if ( vm.matchData.HomeTeam.Id == AppService.user.TeamId) {
      me = vm.matchData.HomeTeam;
      adversary = vm.matchData.VisitorTeam;
    } else {
      me = vm.matchData.VisitorTeam;
      adversary = vm.matchData.HomeTeam;
    }

    if ( me.Goals > adversary.Goals ) {
      vm.matchData.result = 'win';
    } else if ( me.Goals < adversary.Goals ) {
      vm.matchData.result = 'lose';
    } else {
      vm.matchData.result = 'draw';
    }


  })
  .factory('MatchResult', function (MatchResultService, ngDialog) {

    this.open = function (matchId) {
      ngDialog.open({
        template: 'match-result.html',
        appendClassName: 'ngdialog-match-result',
        controller: 'MatchResultController as $ctrl',
        // scope: $scope,
        resolve: {
          matchData: function () {
            return MatchResultService.matchData()
              // .then(function (result) {
              //   return result;
              // });
          }
        },
      });
    }

    return this;

  });
