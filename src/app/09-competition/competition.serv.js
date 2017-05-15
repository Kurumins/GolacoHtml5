'use strict';
angular.module('app')
  .service('CompetitionService', function (PostToJs, $http) {

    var vm = this;

    vm.competitionPreview = function () {
      return PostToJs('Competition/Preview');
    };

    vm.competitionData = function () {
      return $http.get('/data/Competition/CompetitionData');
    };

    vm.getTournamentSummary = function () {
      return PostToJs('CompetitionTournament/Summary');
    };

    vm.getTournamentRanking = function () {
      return PostToJs('CompetitionTournament/Ranking');
    };

  });
