'use strict';
angular.module('app')
  .controller('JuniorCenterController', function (juniorPreview, JuniorDraft, JuniorReform) {
    var vm = this;
    vm.juniorPreview = juniorPreview;

    vm.juniorDraft = JuniorDraft.open;
    vm.juniorDraft();

    vm.juniorReform = JuniorReform.open;
    // vm.juniorReform();
  });
