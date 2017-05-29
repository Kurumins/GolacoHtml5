'use strict';
angular.module('app')
  .controller('JuniorCenterController', function (juniorPreview, JuniorDraft, JuniorReform, InputPopup, StructureService) {
    var vm = this;
    vm.juniorPreview = juniorPreview;

    vm.juniorDraft = JuniorDraft.open;
    vm.juniorDraft();

    vm.juniorReform = JuniorReform.open;
    // vm.juniorReform();

    vm.editName = function () {
      InputPopup.open('Nome do CT', {
        confirmText: 'Salvar',
        initialText: vm.juniorPreview.Name
      })
        .then(function (ctName) {
          StructureService.changingTrainCenterName(ctName)
            .then(function () {
              vm.juniorPreview.Name = ctName;
            })
        })
    };
    // vm.editName();
  });
