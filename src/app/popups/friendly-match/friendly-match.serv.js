'use strict';
angular.module('app')
  .service('FriendlyMatchService', function ($http) {

    var vm = this;

    vm.findFriendlyMatches = function () {
      return $http.get('/data/Match/FindFriendlyMatches');
    };

  });
