'use strict';
angular.module('app')
  .service('StructureService', function (PostToJs) {

    var vm = this;

    // Stadium
    vm.stadiumManage = function () {
      return PostToJs('Stadium/Manage');
    };

    vm.storeList = function () {
      return PostToJs('Store/List');
    };

    vm.stadiumRename = function (stadiumName) {
      return PostToJs('Stadium/Rename', {
        StadiumName: stadiumName
      });
    };

    vm.stadiumList = function () {
      return PostToJs('Stadium/List');
    };

    vm.stadiumRecycle = function (stadiumId) {
      return PostToJs('Stadium/Recycle', {
        StadiumId: stadiumId
      });
    };

    vm.stadiumGetItemList = function (type) {
      return PostToJs('StadiumItem/' + type + 'List');
    };

    vm.stadiumSetStadiumItem = function (type, slot, stadiumItemId) {
      return PostToJs('Stadium/Set' + type + 'StadiumItem', {
        Slot: slot,
        StadiumItemId: stadiumItemId
      });
    };

    // TrainingCenter
    vm.trainingCenterManage = function () {
      return PostToJs('TrainingCenter/Manage');
    };

    vm.trainingCenterSetItem = function (slot, itemId, idTeamTrainCenter) {
      return PostToJs('TrainingCenter/SetTrainingCenterItem', {
        Slot: slot,
        ItemId: itemId,
        IdTeamTrainCenter: idTeamTrainCenter,
      });
    };

    vm.trainingCenterList = function () {
      return PostToJs('TrainingCenter/List');
    };

    vm.trainingCenterRecycle = function (idTeamTrainCenter, idTrainingCenter) {
      return PostToJs('TrainingCenter/Recycle', {
        IdTeamTrainCenter: idTeamTrainCenter,
        IdTrainingCenter: idTrainingCenter,
      });
    };

    // TeamPlayerJunior
    vm.juniorPreview = function () {
      return PostToJs('TeamPlayerJunior/Preview');
    };

    vm.juniorDraft = function () {
      return PostToJs('TeamPlayerJunior/DraftPreview');
    };

    vm.juniorReform = function () {
      return PostToJs('TeamPlayerJunior/GetJuniorTrainCenter');
    };

    vm.updateJuniorTrainCenter = function (IdTrainCenterJunior) {
      return PostToJs('TeamPlayerJunior/UpdateJuniorTrainCenter', {
        IdTrainCenterJunior: IdTrainCenterJunior
      });
    };

    vm.changingTrainCenterName = function (NewName) {
      return PostToJs('TeamPlayerJunior/ChangingTrainCenterName', {
        NewName: NewName
      });
    };

    vm.makeADraft = function (IdPosition, IdScout) {
      return PostToJs('TeamPlayerJunior/MakeADraft', {
        IdPosition: IdPosition,
        IdScout: IdScout
      });
    };

    vm.instantDraft = function () {
      return PostToJs('TeamPlayerJunior/InstantDraft');
    };

    vm.draftToJunior = function (IdTeamPlayerJunior) {
      return PostToJs('TeamPlayerJunior/TeamPlayerDraftToJunior', {
        IdTeamPlayerJunior: IdTeamPlayerJunior
      });
    };

    vm.releaseTeamPlayer = function (IdTeamPlayerJunior) {
      return PostToJs('TeamPlayerJunior/ReleaseTeamPlayer', {
        IdTeamPlayerJunior: IdTeamPlayerJunior
      });
    };

    vm.upgradeJuniorToProfessional = function (IdTeamPlayerJunior, UseAgent) {
      return PostToJs('TeamPlayerJunior/UpgradeJuniorToProfessional', {
        IdTeamPlayerJunior: IdTeamPlayerJunior,
        UseAgent: UseAgent
      });
    };

  });
