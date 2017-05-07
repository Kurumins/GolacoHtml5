'use strict';
angular.module('app')
  .service('CompetitionService', function ($http) {

    var vm = this;

    vm.competitionPreview = function () {
      return $http.get('/data/Competition/Preview');
    };

    vm.competitionData = function () {
      return $http.get('/data/Competition/CompetitionData');
    };

  });
