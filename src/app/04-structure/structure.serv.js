'use strict';
angular.module('app')
  .service('StructureService', function (PostToJs) {

    var vm = this;

    vm.stadiumManage = function () {
      return PostToJs('Stadium/Manage');
    };

    vm.storeList = function () {
      return PostToJs('Store/List');
    };

    //TeamPlayerJunior

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
