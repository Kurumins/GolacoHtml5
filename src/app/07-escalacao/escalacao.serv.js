'use strict';
angular.module('app')
  .service('EscalacaoService', function (PostToJs) {

    var vm = this;

    vm.loadTactic = function () {
      return PostToJs('Team/LoadTactic');
    };

  });
