'use strict';
angular.module('app')
  .controller('CompetitionTournamentController', function (tournamentSummary) {

    var vm = this;

    vm.tournamentSummary = tournamentSummary;

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
          }
        },
      });
    };

    return this;

  });
