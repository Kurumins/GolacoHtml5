'use strict';
angular.module('app')
  .controller('MatchResultController', function (matchData, AppService) {

    var vm = this;

    vm.matchData = matchData.data;

    AppService.getCurrentUploadBadge(vm.matchData.HomeTeam.Id)
      .then(function (badges) {
        vm.matchData.HomeTeam.Badges = badges;
        return AppService.getCurrentUploadBadge(vm.matchData.VisitorTeam.Id);
      })
      .then(function (badges) {
        vm.matchData.VisitorTeam.Badges = badges;
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

    statsContent(vm.matchData);

    function statsContent (dt) {
      var s = dt.HomeTeam.Lineup;
      var m = s[0];
      var ss = [];
      var i = 0;
      var aux = 0;
      //Console.getInstance().dump(m);
      for (var label in m) {

        if (label == "IdTeamPlayer" ||
          label == "Played" ||
          label == "ShirtNumber" ||
          label == "Injuries" ||
          label == "Name" ||
          label == "Goals" ||
          label == "PenaltySaves" ||
          label == "Saves")
          continue;

        var item = {
          label: label
        };

        aux = 0;
        for (i = 0; i < dt.HomeTeam.Lineup.length; i++)
          aux += dt.HomeTeam.Lineup[i][label];
        for (i = 0; i < dt.HomeTeam.Bench.length; i++)
          aux += dt.HomeTeam.Bench[i][label];
        item.homeValue = aux;

        aux = 0;
        for (i = 0; i < dt.VisitorTeam.Lineup.length; i++)
          aux += dt.VisitorTeam.Lineup[i][label];
        for (i = 0; i < dt.VisitorTeam.Bench.length; i++)
          aux += dt.VisitorTeam.Bench[i][label];
        item.visitorValue = aux;

        ss.push(item);
      }

      dt.stats = ss;
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
