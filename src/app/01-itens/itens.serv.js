'use strict';
angular.module('app')
  .service('ItensService', function ($http) {
    this.inventory = function () {
      return $http.get('/data/Team/Inventory');
    };
    this.storeList = function () {
      return $http.get('/data/Store/List');
    };
  });
