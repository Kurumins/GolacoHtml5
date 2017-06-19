'use strict';
angular.module('app')
  .factory('CompetitionTournamentLight', function (CompetitionService, ngDialog) {

    this.open = function (tournament) {
      ngDialog.open({
        template: 'competition-tournament-light.html',
        appendClassName: 'ngdialog-competition-tournament',
        controller: 'CompetitionTournamentController as $ctrl',
        // scope: $scope,
        resolve: {
          tournament: function () {
            return tournament;
          },
          tournamentSummary: function () {
            return CompetitionService.getTournamentLightSummary(tournament.preview.IdCompetition);
          },
          tournamentRanking: function () {
            return CompetitionService.getTournamentLightRanking(tournament.preview.IdCompetition);
          },
          tournamentMatchTable: function () {
            return CompetitionService.getTournamentLightMatchTable(tournament.preview.IdCompetition);
          },
          tournamentCalendar: function () {
            return CompetitionService.getTournamentLightCalendar(tournament.preview.IdCompetition);
          },
          tournamentPlayOff: function () {
            return CompetitionService.getTournamentLightPlayOff(tournament.preview.IdCompetition);
          },
        },
      });
    };

    return this;

  });
