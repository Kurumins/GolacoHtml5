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

    vm.changingTrainCenterName = function (NewName) {
      return PostToJs('TeamPlayerJunior/ChangingTrainCenterName', {
        NewName: NewName
      });
    };

  });
