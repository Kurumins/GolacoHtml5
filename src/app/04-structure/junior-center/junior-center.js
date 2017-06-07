'use strict';
angular.module('app')
  .controller('JuniorCenterController', function ($rootScope, juniorPreview, JuniorDraft, JuniorReform, InputPopup, StructureService, AlertPopup, ConfirmPopup) {

    var vm = this;
    vm.juniorPreview = juniorPreview;

    vm.juniorDraft = function () {
      JuniorDraft.open()
        .then(updateJuniorPreview, updateJuniorPreview);
    };
    // vm.juniorDraft();

    vm.juniorReform = function () {
      JuniorReform.open()
        .then(updateJuniorPreview, updateJuniorPreview);
    };
    // vm.juniorReform();

    vm.editName = function () {
      InputPopup.open('Nome do CT', {
        confirmText: 'Salvar',
        initialText: vm.juniorPreview.Name
      })
        .then(function (ctName) {
          StructureService.changingTrainCenterName(ctName)
            .then(updateJuniorPreview);
        });
    };

    vm.releaseTeamPlayer = function (idTeamPlayerJunior) {
      ConfirmPopup.open('Atenção', 'JuniorCenterPreview.lblConfirmPlayerRelease')
        .then(function () {
          return StructureService.releaseTeamPlayer(idTeamPlayerJunior);
        })
        .then(function () {
          $rootScope.$emit('balanceUpdate');
          AlertPopup.open('Atenção', 'JuniorCenterPreview.lblPlayerReleased');
          updateJuniorPreview();
        })
        .catch(function (error) {
          AlertPopup.open('Atenção', error.Message);
        });
    };

    vm.upgradeJuniorToProfessional = function (idTeamPlayerJunior, useAgent) {
      ConfirmPopup.open('Atenção', 'JuniorCenterPreview.lblConfirmPlayerHire')
        .then(function () {
          return StructureService.upgradeJuniorToProfessional(idTeamPlayerJunior, useAgent);
        })
        .then(function () {
          $rootScope.$emit('balanceUpdate');
          AlertPopup.open('Atenção', 'JuniorCenterPreview.lblPlayerHired');
          updateJuniorPreview();
        })
        .catch(function (error) {
          AlertPopup.open('Atenção', error.Message);
        });
    };

    function updateJuniorPreview () {
      return StructureService.juniorPreview()
        .then(function (juniorPreview) {
          vm.juniorPreview = juniorPreview;
        });
    }

  });
