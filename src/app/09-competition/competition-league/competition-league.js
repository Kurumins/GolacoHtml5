'use strict';
angular.module('app')
  .controller('CompetitionLeagueController', function ($timeout, league, leagueSummary, leagueRanking, leagueMatchTable, leagueCalendar/*, leaguePlayOff*/) {

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

    // vm.leaguePlayOff = leaguePlayOff;

  })

  .factory('CompetitionLeague', function (CompetitionService, ngDialog) {

    this.open = function (league) {
      ngDialog.open({
        template: 'competition-league.html',
        appendClassName: 'ngdialog-competition-league',
        controller: 'CompetitionLeagueController as $ctrl',
        // scope: $scope,
        resolve: {
          league: function () {
            return league;
          },
          leagueSummary: function () {
            return CompetitionService.getLeagueSummary();
          },
          leagueRanking: function () {
            return CompetitionService.getLeagueRanking();
          },
          leagueMatchTable: function () {
            return CompetitionService.getLeagueMatchTable();
          },
          leagueCalendar: function () {
            return CompetitionService.getLeagueCalendar();
          },
          // leaguePlayOff: function () {
          //   return CompetitionService.getLeaguePlayOff();
          // },
        },
      });
    };

    return this;

  });
