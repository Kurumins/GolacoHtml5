'use strict';
angular.module('app')
  .service('TrainingService', function (PostToJs) {

    var vm = this;

    vm.trainingManage = function () {
      return PostToJs('TrainingCenter/Manage');
    };

    vm.playerTrain = function (PlayerIds, IdTeamTrainCenter, TrainPlanIds, JuniorIds) {
      return PostToJs('TeamPlayer/Train', {
        PlayerIds: PlayerIds,
        IdTeamTrainCenter: IdTeamTrainCenter,
        TrainPlanIds: TrainPlanIds,
        JuniorIds: JuniorIds
      });
    };

    vm.refreshTraining = function (TeamPlayer) {
      return PostToJs('TeamPlayer/RefreshTraining', {
        TeamPlayerId: TeamPlayer.Id,
        TeamPlayerType: TeamPlayer.TeamPlayerType,
      });
    };

  });
