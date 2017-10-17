'use strict';
angular.module('app')
  .controller('CompetitionDetailsController', function ($scope, competition, CompetitionService, ConfirmPopup, AlertPopup, AppService) {

    var vm = this;
    vm.competition = competition;
    vm.prizeList = competition.data.prizeList.prize;
    vm.scope = $scope;
    vm.teamPreview = AppService.teamPreview;

    vm.matchTypes = [
      '',
      'lblCompetitionGroups',
      'lblCompetitionGroupsKnockout',
      'lblCompetitionKnockout',
    ];

    vm.register = function () {
      ConfirmPopup.open('Atenção', 'Deseja confirmar sua inscrição na competição ' + vm.competition.data.name)
        .then(function () {
          CompetitionService.competitionRegister(vm.competition.name)
            .then(function () {
              vm.scope.closeThisDialog();
              AlertPopup.open('Atenção', 'Inscrição realizada com sucesso');
            })
            .catch(function (error) {
              AlertPopup.open('Atenção', error.Message);
            });
        });
    };

  });
