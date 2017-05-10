'use strict';
angular.module('app')
  .controller('JuniorDraftController', function (juniorDraft) {

    var vm = this;


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
