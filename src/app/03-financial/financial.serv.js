'use strict';
angular.module('app')
  .service('FinancialService', function (PostToJs/*, $http*/) {

    var vm = this;

    vm.summary = function () {
      return PostToJs('Finance/FinancialSummary');
    };

  });
