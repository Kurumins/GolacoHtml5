'use strict';
angular.module('app')
  .controller('JuniorDraftController', function (juniorDraft, JuniorScouts) {

    var vm = this;

    vm.juniorDraft = juniorDraft;

    vm.juniorScouts = function function_name() {
      JuniorScouts.open(vm.juniorDraft.Scouts)
        .then(function (scout) {
          vm.currentScout = scout;
        });
    };
    // vm.juniorScouts();
    vm.currentScout = vm.juniorDraft.Scouts[0];

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
