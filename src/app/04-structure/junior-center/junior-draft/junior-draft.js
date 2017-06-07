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
    // vm.currentScout = vm.juniorDraft.Scouts[0];

    vm.makeADraft = function (idPosition) {
      ConfirmPopup.open('Atenção', 'lblConfirmDraft')
        .then(function () {
          return StructureService.makeADraft(idPosition || '',  vm.currentScout && vm.currentScout.Id || '');
        })
        .then(function () {
        })
        .catch(function (error) {
          AlertPopup.open('Atenção', error.Message);
        });
    };

    vm.instantDraft = function () {
      ConfirmPopup.open('Atenção', 'lblConfirmDraftTimeSkip')
        .then(function () {
          return StructureService.instantDraft();
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

    vm.draftToJunior = function () {
      ConfirmPopup.open('Atenção', 'lblConfirmPromote')
        .then(function () {
          return StructureService.draftToJunior(vm.currentPlayer.Id);
          // return StructureService.draftToJunior(3242845);
        })
        .then(function () {
          AlertPopup.open('Atenção', 'lblPromoteSuccess');
          StructureService.juniorDraft()
            .then(function (juniorDraft) {
              vm.juniorDraft = juniorDraft;
            });
        })
        .catch(function (error) {
          AlertPopup.open('Atenção', error.Message);
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
