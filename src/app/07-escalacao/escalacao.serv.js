'use strict';
angular.module('app')
  .service('EscalacaoService', function ($http) {

    var vm = this;

    vm.loadTactic = function () {
      return $http.get('/data/Team/LoadTactic');
    };

  });
