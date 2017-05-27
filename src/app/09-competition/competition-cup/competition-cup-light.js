'use strict';
angular.module('app')
  .factory('CompetitionCupLight', function (CompetitionService, ngDialog) {

    this.open = function (cup) {
      ngDialog.open({
        template: 'competition-cup-light.html',
        appendClassName: 'ngdialog-competition-cup',
        controller: 'CompetitionCupController as $ctrl',
        // scope: $scope,
        resolve: {
          cup: function () {
            return cup;
          },
          cupSummary: function () {
            return CompetitionLiService.getCupSummary(cup.preview.IdCompetition);
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
            return CompetitionLiService.getCupPlayOff(cup.preview.IdCompetition);
          },
        },
      });
    };

    return this;

  });
