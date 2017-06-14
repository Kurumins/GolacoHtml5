'use strict';
angular.module('app')
  .controller('CompetitionTournamentController', function ($timeout, tournament, tournamentSummary, tournamentRanking, tournamentMatchTable, tournamentCalendar, tournamentPlayOff) {

    var vm = this;

    vm.tournament = tournament;

    vm.commonSummary = tournamentSummary;
    vm.competitionSeries = ' ABCD'.charAt(vm.commonSummary.CompetitionSeries);

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

    vm.tournamentPlayOff = tournamentPlayOff;

  })
  .factory('CompetitionTournament', function (CompetitionService, ngDialog) {

    this.open = function (tournament) {
      ngDialog.open({
        template: 'competition-tournament.html',
        appendClassName: 'ngdialog-competition-tournament',
        controller: 'CompetitionTournamentController as $ctrl',
        // scope: $scope,
        resolve: {
          tournament: function () {
            return tournament;
          },
          tournamentSummary: function () {
            return CompetitionService.getTournamentSummary(tournament.preview.IdCompetition);
          },
          tournamentRanking: function () {
            return CompetitionService.getTournamentRanking(tournament.preview.IdCompetition);
          },
          tournamentMatchTable: function () {
            return CompetitionService.getTournamentMatchTable(tournament.preview.IdCompetition);
          },
          tournamentCalendar: function () {
            return CompetitionService.getTournamentCalendar(tournament.preview.IdCompetition);
          },
          tournamentPlayOff: function () {
            return CompetitionService.getTournamentPlayOff(tournament.preview.IdCompetition);
          },
        },
      });
    };

    return this;

  });
