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
        .then(function (result) {
        })
        .catch(function (error) {
          AlertPopup.open('Atenção', error.Message)
        })
    }

    vm.instantDraft = function () {
      ConfirmPopup.open('Atenção', 'lblConfirmDraftTimeSkip')
        .then(function () {
          return StructureService.instantDraft();
        })
        .then(function (result) {
          $rootScope.$emit('balanceUpdate');
          StructureService.juniorDraft()
            .then(function (juniorDraft) {
              vm.juniorDraft = juniorDraft;
            });
        })
        .catch(function (error) {
          AlertPopup.open('Atenção', error.Message)
        })
    }

  })
  .factory('JuniorDraft', function (StructureService, ngDialog) {

    this.open = function () {
      ngDialog.open({
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
