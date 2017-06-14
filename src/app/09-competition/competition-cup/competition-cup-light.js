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
            return CompetitionService.getCupLightSummary(cup.preview.IdCompetition);
          },
          // cupRanking: function () {
          //   return CompetitionService.getCupLightRanking();
          // },
          // cupMatchTable: function () {
          //   return CompetitionService.getCupLightMatchTable();
          // },
          // cupCalendar: function () {
          //   return CompetitionService.getCupLightCalendar();
          // },
          cupPlayOff: function () {
            return CompetitionService.getCupLightPlayOff(cup.preview.IdCompetition);
          },
          cupSemifinal: function () {
            return CompetitionService.getCupLightSemifinal(cup.preview.IdCompetition);
          },
          cupFinals: function () {
            return CompetitionService.getCupLightFinals(cup.preview.IdCompetition);
          },
        },
      });
    };

    return this;

  });
