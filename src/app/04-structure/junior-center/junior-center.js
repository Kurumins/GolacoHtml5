'use strict';
angular.module('app')
  .controller('JuniorCenterController', function (juniorPreview, JuniorDraft) {
    var vm = this;
    vm.juniorPreview = juniorPreview;

    vm.juniorDraft = JuniorDraft.open;
    // vm.juniorDraft();
  });
