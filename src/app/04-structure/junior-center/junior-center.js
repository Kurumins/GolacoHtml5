'use strict';
angular.module('app')
  .controller('JuniorCenterController', function (juniorPreview, JuniorDraft, JuniorReform, InputPopup, StructureService) {

    var vm = this;
    vm.juniorPreview = juniorPreview;

    vm.juniorDraft = function () {
      JuniorDraft.open()
        .then(updateJuniorPreview, updateJuniorPreview)
    };
    // vm.juniorDraft();

    vm.juniorReform = function () {
      JuniorReform.open()
        .then(updateJuniorPreview, updateJuniorPreview)
    };
    // vm.juniorReform();

    vm.editName = function () {
      InputPopup.open('Nome do CT', {
        confirmText: 'Salvar',
        initialText: vm.juniorPreview.Name
      })
        .then(function (ctName) {
          StructureService.changingTrainCenterName(ctName)
            .then(updateJuniorPreview)
        })
    };

    function updateJuniorPreview() {
      return StructureService.juniorPreview()
        .then(function () {
          vm.juniorPreview = juniorPreview;
        });
    }

  });
