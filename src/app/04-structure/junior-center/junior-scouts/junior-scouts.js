'use strict';
angular.module('app')
  .controller('JuniorScoutsController', function (juniorScouts) {

    var vm = this;

    vm.juniorScouts = juniorScouts;

  })
  .factory('JuniorScouts', function (StructureService, ngDialog) {

    this.open = function (juniorScouts) {

      // var deferred = $q.defer();

      // vm.callbacks[action] = function (result) {
      //   if ( result.Success !== false) {
      //     deferred.resolve(result);
      //   } else {
      //     deferred.reject(result);
      //   }
      // };

      // return deferred.promise;

      return ngDialog.openConfirm({
        template: 'junior-scouts.html',
        appendClassName: 'ngdialog-junior-scouts',
        controller: 'JuniorScoutsController as $ctrl',
        // scope: $scope,
        resolve: {
          juniorScouts: function () {
            return juniorScouts;
          }
        },
      });
    };

    return this;

  });
