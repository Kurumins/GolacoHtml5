'use strict';
angular.module('app')
  .controller('CompetitionLeagueController', function ($timeout, league, leagueSummary, leagueRanking, leagueMatchTable, leagueCalendar/*, leaguePlayOff*/, MatchResult) {

    var vm = this;

    vm.league = league;

    vm.commonSummary = leagueSummary;

    vm.leagueRanking = leagueRanking;
    // vm.leagueRankingCurrentGroup = leagueRanking.Ranking[0];

    vm.leagueMatchTable = leagueMatchTable;

    vm.leagueCalendar = leagueCalendar;
    vm.currentSlide = leagueCalendar.Round;
    vm.calendarSlider = {
      method: {},
      event: {
        afterChange: function (event, slick, currentSlide/*, nextSlide*/) {
          vm.currentSlide = currentSlide + 1;
        },
        init: function (event, slick) {
          slick.slickGoTo(vm.currentSlide - 1);
        }
      }
    };

    vm.matchResult = MatchResult.open;

    // vm.leaguePlayOff = leaguePlayOff;

  })

  .factory('CompetitionLeague', function (CompetitionService, ngDialog) {

    this.open = function (league) {
      return ngDialog.openConfirm({
        template: 'competition-league.html',
        appendClassName: 'ngdialog-competition-league',
        controller: 'CompetitionLeagueController as $ctrl',
        // scope: $scope,
        resolve: {
          league: function () {
            return league;
          },
          leagueSummary: function () {
            return CompetitionService.getLeagueSummary(league.preview.IdCompetition, league.preview.socialId);
          },
          leagueRanking: function () {
            return CompetitionService.getLeagueRanking(league.preview.IdCompetition, league.preview.socialId);
          },
          leagueMatchTable: function () {
            return CompetitionService.getLeagueMatchTable(league.preview.IdCompetition, league.preview.socialId);
          },
          leagueCalendar: function () {
            return CompetitionService.getLeagueCalendar(league.preview.IdCompetition, league.preview.socialId);
          },
          // leaguePlayOff: function () {
          //   return CompetitionService.getLeaguePlayOff();
          // },
        },
      });
    };

    return this;

  });
