'use strict';
angular.module('app')
  .controller('CompetitionTournamentController', function (tournamentSummary, tournamentRanking, tournamentMatchTable, tournamentCalendar, $timeout) {

    var vm = this;

    vm.tournamentSummary = tournamentSummary;

    vm.tournamentRanking = tournamentRanking;
    vm.tournamentRankingCurrentGroup = tournamentRanking.Ranking[0];

    vm.tournamentMatchTable = tournamentMatchTable;

    vm.tournamentCalendar = tournamentCalendar;
    vm.setCalendar = function (calendar) {
      vm.tournamentCalendarCurrentGroup = null;
      $timeout(function () {
        vm.tournamentCalendarCurrentGroup = calendar;
      }, 1);
    };
    vm.setCalendar(vm.tournamentCalendar.Calendar[0]);

  })
  .factory('CompetitionTournament', function (CompetitionService, ngDialog) {

    this.open = function () {
      ngDialog.open({
        template: 'competition-tournament.html',
        appendClassName: 'ngdialog-competition-tournament',
        controller: 'CompetitionTournamentController as $ctrl',
        // scope: $scope,
        resolve: {
          tournamentSummary: function () {
            return CompetitionService.getTournamentSummary();
          },
          tournamentRanking: function () {
            return CompetitionService.getTournamentRanking();
          },
          tournamentMatchTable: function () {
            return CompetitionService.getTournamentMatchTable();
          },
          tournamentCalendar: function () {
            return CompetitionService.getTournamentCalendar();
          },
        },
      });
    };

    return this;

  });
