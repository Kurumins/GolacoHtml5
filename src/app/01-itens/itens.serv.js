'use strict';
angular.module('app')
  .service('ItensService', function ($http) {

    var vm = this;

    vm.inventory = function () {
      return $http.get('/data/Team/Inventory');
    };

    vm.storeList = function () {
      return $http.get('/data/Store/List');
    };

  });
