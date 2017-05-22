'use strict';
angular.module('app')
  .controller('CompetitionDetailsController', function (competition) {

    var vm = this;

    vm.competition = competition;

    vm.matchTypes = [
      '',
      'lblCompetitionGroups',
      'lblCompetitionGroupsKnockout',
      'lblCompetitionKnockout',
    ];

  });
