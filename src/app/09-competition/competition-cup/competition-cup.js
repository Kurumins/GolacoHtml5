'use strict';
angular.module('app')
  .controller('CompetitionCupController', function ($timeout, cup, cupSummary/*, cupRanking, cupMatchTable, cupCalendar*/, cupPlayOff) {

    var vm = this;

    vm.cup = cup;

    vm.commonSummary = cupSummary;

    // vm.cupRanking = cupRanking;
    // vm.cupRankingCurrentGroup = cupRanking.Ranking[0];

    // vm.cupMatchTable = cupMatchTable;

    // vm.cupCalendar = cupCalendar;
    // vm.setCalendar = function (calendar) {
    //   vm.cupCalendarCurrentGroup = null;
    //   $timeout(function () {
    //     vm.cupCalendarCurrentGroup = calendar;
    //   }, 1);
    // };
    // vm.setCalendar(vm.cupCalendar.Calendar[0]);

    vm.cupPlayOff = cupPlayOff;

  })
  .factory('CompetitionCup', function (CompetitionService, ngDialog) {

    this.open = function (cup) {
      ngDialog.open({
        template: 'competition-cup.html',
        appendClassName: 'ngdialog-competition-cup',
        controller: 'CompetitionCupController as $ctrl',
        // scope: $scope,
        resolve: {
          cup: function () {
            return cup;
          },
          cupSummary: function () {
            return CompetitionService.getCupSummary(cup.preview.IdCompetition);
          },
          // cupRanking: function () {
          //   return CompetitionService.getCupRanking();
          // },
          // cupMatchTable: function () {
          //   return CompetitionService.getCupMatchTable();
          // },
          // cupCalendar: function () {
          //   return CompetitionService.getCupCalendar();
          // },
          cupPlayOff: function () {
            return CompetitionService.getCupPlayOff(cup.preview.IdCompetition);
          },
        },
      });
    };

    return this;

  });
