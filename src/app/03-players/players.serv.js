'use strict';
angular.module('app')
  .service('TeamPlayerService', function ($http) {

    var vm = this;

    vm.teamPlayerList = function () {
      return $http.get('/data/TeamPlayer/List');
    };

  });
