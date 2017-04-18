'use strict';
angular
  .module('app')
  .component('main', {
    templateUrl: 'app/01-main/main.html',
    controller: function (MainService) {
      MainService.milhas()
        .then(function (result) {
          // console.log(result.data.auth);
          return MainService.userVerify();
        })
        .then(function (result) {
          MainService.milhas2();
        })
    }
    // template: 'main'
  });
