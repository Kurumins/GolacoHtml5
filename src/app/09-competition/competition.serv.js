'use strict';
angular.module('app')
  .service('CompetitionService', function (PostToJs, $http) {

    var vm = this;

    vm.competitionPreview = function () {
      return PostToJs('Competition/Preview');
    };

    vm.competitionData = function () {
      return $http.get('/data/Competition/CompetitionData.json');
    };

    vm.competitionRegister = function (competitionType) {
      return PostToJs(competitionType + '/Register');
    };

    // Tournament
    vm.getTournamentSummary = function (competitionId, socialId) {
      return PostToJs('CompetitionTournament/Summary', {CompetitionId: competitionId, SocialId: socialId});
    };

    vm.getTournamentRanking = function (competitionId, socialId) {
      return PostToJs('CompetitionTournament/Ranking', {CompetitionId: competitionId, SocialId: socialId});
    };

    vm.getTournamentMatchTable = function (competitionId, socialId) {
      return PostToJs('CompetitionTournament/MatchTable', {CompetitionId: competitionId, SocialId: socialId});
    };

    vm.getTournamentCalendar = function (competitionId, socialId) {
      return PostToJs('CompetitionTournament/Calendar', {CompetitionId: competitionId, SocialId: socialId});
    };

    vm.getTournamentPlayOff = function (competitionId, socialId) {
      return PostToJs('CompetitionTournament/PlayOff', {CompetitionId: competitionId, SocialId: socialId});
    };

    // League
    vm.getLeagueSummary = function (competitionId, socialId) {
      return PostToJs('CompetitionLeague/Summary', {CompetitionId: competitionId, SocialId: socialId});
    };

    vm.getLeagueRanking = function (competitionId, socialId) {
      return PostToJs('CompetitionLeague/Ranking', {CompetitionId: competitionId, SocialId: socialId});
    };

    vm.getLeagueMatchTable = function (competitionId, socialId) {
      return PostToJs('CompetitionLeague/MatchTable', {CompetitionId: competitionId, SocialId: socialId});
    };

    vm.getLeagueCalendar = function (competitionId, socialId) {
      return PostToJs('CompetitionLeague/Calendar', {CompetitionId: competitionId, SocialId: socialId});
    };

    // Cup
    vm.getCupSummary = function (competitionId, socialId) {
      return PostToJs('CompetitionCup/Summary', {CompetitionId: competitionId, SocialId: socialId});
    };

    vm.getCupLightSemifinal = function (competitionId, socialId) {
      return PostToJs('CompetitionCup/Semifinal', {CompetitionId: competitionId, SocialId: socialId});
    };

    vm.getCupLightFinals = function (competitionId, socialId) {
      return PostToJs('CompetitionCup/Finals', {CompetitionId: competitionId, SocialId: socialId});
    };

    // vm.getCupRanking = function (competitionId, socialId) {
    //   return PostToJs('CompetitionCup/Ranking', {CompetitionId: competitionId, SocialId: socialId});
    // };

    // vm.getCupMatchTable = function (competitionId, socialId) {
    //   return PostToJs('CompetitionCup/MatchTable', {CompetitionId: competitionId, SocialId: socialId});
    // };

    // vm.getCupCalendar = function (competitionId, socialId) {
    //   return PostToJs('CompetitionCup/Calendar', {CompetitionId: competitionId, SocialId: socialId});
    // };

    vm.getCupPlayOff = function (competitionId, socialId) {
      return PostToJs('CompetitionCup/PlayOff', {CompetitionId: competitionId, SocialId: socialId});
    };

    // Tournament light
    vm.getTournamentLightSummary = function (competitionId, socialId) {
      return PostToJs('CompetitionTournamentLight/Summary', {CompetitionId: competitionId, SocialId: socialId});
    };

    vm.getTournamentLightRanking = function (competitionId, socialId) {
      return PostToJs('CompetitionTournamentLight/Ranking', {CompetitionId: competitionId, SocialId: socialId});
    };

    vm.getTournamentLightMatchTable = function (competitionId, socialId) {
      return PostToJs('CompetitionTournamentLight/MatchTable', {CompetitionId: competitionId, SocialId: socialId});
    };

    vm.getTournamentLightCalendar = function (competitionId, socialId) {
      return PostToJs('CompetitionTournamentLight/Calendar', {CompetitionId: competitionId, SocialId: socialId});
    };

    vm.getTournamentLightPlayOff = function (competitionId, socialId) {
      return PostToJs('CompetitionTournamentLight/PlayOff', {CompetitionId: competitionId, SocialId: socialId});
    };

    // Cup Light
    vm.getCupLightSummary = function (competitionId, socialId) {
      return PostToJs('CompetitionCupLight/Summary', {CompetitionId: competitionId, SocialId: socialId});
    };

    // vm.getCupLightRanking = function (competitionId, socialId) {
    //   return PostToJs('CompetitionCupLight/Ranking', {CompetitionId: competitionId, SocialId: socialId});
    // };

    // vm.getCupLightMatchTable = function (competitionId, socialId) {
    //   return PostToJs('CompetitionCupLight/MatchTable', {CompetitionId: competitionId, SocialId: socialId});
    // };

    vm.getCupLightPlayOff = function (competitionId, socialId) {
      return PostToJs('CompetitionCupLight/PlayOff', {CompetitionId: competitionId, SocialId: socialId});
    };

    vm.getCupLightSemifinal = function (competitionId, socialId) {
      return PostToJs('CompetitionCupLight/Semifinal', {CompetitionId: competitionId, SocialId: socialId});
    };

    vm.getCupLightFinals = function (competitionId, socialId) {
      return PostToJs('CompetitionCupLight/Finals', {CompetitionId: competitionId, SocialId: socialId});
    };

  });
