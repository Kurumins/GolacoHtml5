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
    vm.getTournamentSummary = function (competitionId) {
      return PostToJs('CompetitionTournament/Summary', {CompetitionId: competitionId});
    };

    vm.getTournamentRanking = function (competitionId) {
      return PostToJs('CompetitionTournament/Ranking', {CompetitionId: competitionId});
    };

    vm.getTournamentMatchTable = function (competitionId) {
      return PostToJs('CompetitionTournament/MatchTable', {CompetitionId: competitionId});
    };

    vm.getTournamentCalendar = function (competitionId) {
      return PostToJs('CompetitionTournament/Calendar', {CompetitionId: competitionId});
    };

    vm.getTournamentPlayOff = function (competitionId) {
      return PostToJs('CompetitionTournament/PlayOff', {CompetitionId: competitionId});
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
    vm.getCupSummary = function (competitionId) {
      return PostToJs('CompetitionCup/Summary', {CompetitionId: competitionId});
    };

    vm.getCupRanking = function (competitionId) {
      return PostToJs('CompetitionCup/Ranking', {CompetitionId: competitionId});
    };

    vm.getCupMatchTable = function (competitionId) {
      return PostToJs('CompetitionCup/MatchTable', {CompetitionId: competitionId});
    };

    vm.getCupCalendar = function (competitionId) {
      return PostToJs('CompetitionCup/Calendar', {CompetitionId: competitionId});
    };

    vm.getCupPlayOff = function (competitionId) {
      return PostToJs('CompetitionCup/PlayOff', {CompetitionId: competitionId});
    };

  });
