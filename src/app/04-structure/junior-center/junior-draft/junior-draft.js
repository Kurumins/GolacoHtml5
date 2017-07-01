'use strict';
angular.module('app')
  .controller('JuniorDraftController', function ($rootScope, juniorDraft, JuniorScouts, StructureService, ConfirmPopup, AlertPopup) {

    var vm = this;

    vm.juniorDraft = juniorDraft;

    vm.juniorScouts = function () {
      JuniorScouts.open(vm.juniorDraft.Scouts)
        .then(function (scout) {
          vm.currentScout = scout;
        });
    };
    // vm.juniorScouts();

    if (vm.juniorDraft.SelectedScoutId) {
      vm.currentScout = vm.juniorDraft.Scouts.find(function (scout) {
        return scout.Id == vm.juniorDraft.SelectedScoutId;
      })
    }
    // vm.currentScout = vm.juniorDraft.Scouts[0];

    vm.makeADraft = function (idPosition) {
      ConfirmPopup.open('Error.errorTitle', 'DraftCenter.lblConfirmDraft')
        .then(function () {
          return StructureService.makeADraft(idPosition || '',  vm.currentScout && vm.currentScout.Id || '');
        })
        .then(function () {
          $rootScope.$emit('balanceUpdate');
          StructureService.juniorDraft()
            .then(function (juniorDraft) {
              vm.juniorDraft = juniorDraft;
            });
        })
        .catch(function (error) {
          AlertPopup.open('Atenção', error.Message);
        });
    };

    vm.instantDraft = function () {
      ConfirmPopup.open('Error.errorTitle', 'DraftCenter.lblConfirmDraftTimeSkip;n' + vm.juniorDraft.PriceToInstantDraft)
        .then(function () {
          return StructureService.instantDraft();
        })
        .then(function () {
          $rootScope.$emit('balanceUpdate');
          StructureService.juniorDraft()
            .then(function (juniorDraft) {
              vm.juniorDraft = juniorDraft;
              delete vm.currentScout;
            });
        })
        .catch(function (error) {
          AlertPopup.open('Error.errorTitle', error.Message);
        });
    };

    vm.draftToJunior = function () {
      ConfirmPopup.open('Error.errorTitle', 'DraftCenter.lblConfirmPromote')
        .then(function () {
          return StructureService.draftToJunior(vm.currentPlayer.Id);
          // return StructureService.draftToJunior(3242845);
        })
        .then(function () {
          AlertPopup.open('Error.errorTitle', 'DraftCenter.lblPromoteSuccess');
          StructureService.juniorDraft()
            .then(function (juniorDraft) {
              vm.juniorDraft = juniorDraft;
            });
        })
        .catch(function (error) {
          AlertPopup.open('Error.errorTitle', error.Message);
        });
    };

  })
  .factory('JuniorDraft', function (StructureService, ngDialog) {

    this.open = function () {
      return ngDialog.openConfirm({
        template: 'junior-draft.html',
        appendClassName: 'ngdialog-junior-draft',
        controller: 'JuniorDraftController as $ctrl',
        // scope: $scope,
        resolve: {
          juniorDraft: function () {
            return StructureService.juniorDraft();
          }
        },
      });
    };

    return this;

  });
