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

    // Tournament
    vm.getTournamentSummary = function () {
      return PostToJs('CompetitionTournament/Summary');
    };

    vm.getTournamentRanking = function () {
      return PostToJs('CompetitionTournament/Ranking');
    };

    vm.getTournamentMatchTable = function () {
      return PostToJs('CompetitionTournament/MatchTable');
    };

    vm.getTournamentCalendar = function () {
      return PostToJs('CompetitionTournament/Calendar');
    };

    vm.getTournamentPlayOff = function () {
      return PostToJs('CompetitionTournament/PlayOff');
    };

    // League
    vm.getLeagueSummary = function (competitionId) {
      return PostToJs('CompetitionLeague/Summary', {CompetitionId: competitionId});
    };

    vm.getLeagueRanking = function (competitionId) {
      return PostToJs('CompetitionLeague/Ranking', {CompetitionId: competitionId});
    };

    vm.getLeagueMatchTable = function (competitionId) {
      return PostToJs('CompetitionLeague/MatchTable', {CompetitionId: competitionId});
    };

    vm.getLeagueCalendar = function (competitionId) {
      return PostToJs('CompetitionLeague/Calendar', {CompetitionId: competitionId});
    };

    // Cup
    vm.getCupSummary = function () {
      return PostToJs('CompetitionCup/Summary');
    };

    vm.getCupRanking = function () {
      return PostToJs('CompetitionCup/Ranking');
    };

    vm.getCupMatchTable = function () {
      return PostToJs('CompetitionCup/MatchTable');
    };

    vm.getCupCalendar = function () {
      return PostToJs('CompetitionCup/Calendar');
    };

    vm.getCupPlayOff = function () {
      return PostToJs('CompetitionCup/PlayOff');
    };

  });
