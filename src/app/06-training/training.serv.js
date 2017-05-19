'use strict';
angular.module('app')
  .service('TrainingService', function (PostToJs) {

    var vm = this;

    vm.trainingManage = function () {
      return PostToJs('TrainingCenter/Manage');
    };

  });
