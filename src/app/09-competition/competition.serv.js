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

    vm.competitionRegister = function (competitionType) {
      return PostToJs(competitionType +'/Register');
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

    // vm.getCupRanking = function (competitionId) {
    //   return PostToJs('CompetitionCup/Ranking', {CompetitionId: competitionId});
    // };

    // vm.getCupMatchTable = function (competitionId) {
    //   return PostToJs('CompetitionCup/MatchTable', {CompetitionId: competitionId});
    // };

    // vm.getCupCalendar = function (competitionId) {
    //   return PostToJs('CompetitionCup/Calendar', {CompetitionId: competitionId});
    // };

    vm.getCupPlayOff = function (competitionId) {
      return PostToJs('CompetitionCup/PlayOff', {CompetitionId: competitionId});
    };

    // Tournament light
    vm.getTournamentLightSummary = function (competitionId) {
      return PostToJs('CompetitionTournamentLight/Summary', {CompetitionId: competitionId});
    };

    vm.getTournamentLightRanking = function (competitionId) {
      return PostToJs('CompetitionTournamentLight/Ranking', {CompetitionId: competitionId});
    };

    vm.getTournamentLightMatchTable = function (competitionId) {
      return PostToJs('CompetitionTournamentLight/MatchTable', {CompetitionId: competitionId});
    };

    vm.getTournamentLightCalendar = function (competitionId) {
      return PostToJs('CompetitionTournamentLight/Calendar', {CompetitionId: competitionId});
    };

    vm.getTournamentLightPlayOff = function (competitionId) {
      return PostToJs('CompetitionTournamentLight/PlayOff', {CompetitionId: competitionId});
    };

    // Cup Light
    vm.getCupLightSummary = function (competitionId) {
      return PostToJs('CompetitionCupLight/Summary', {CompetitionId: competitionId});
    };

    // vm.getCupLightRanking = function (competitionId) {
    //   return PostToJs('CompetitionCupLight/Ranking', {CompetitionId: competitionId});
    // };

    // vm.getCupLightMatchTable = function (competitionId) {
    //   return PostToJs('CompetitionCupLight/MatchTable', {CompetitionId: competitionId});
    // };

    // vm.getCupLightCalendar = function (competitionId) {
    //   return PostToJs('CompetitionCupLight/Calendar', {CompetitionId: competitionId});
    // };

    vm.getCupLightPlayOff = function (competitionId) {
      return PostToJs('CompetitionCupLight/PlayOff', {CompetitionId: competitionId});
    };

  });
