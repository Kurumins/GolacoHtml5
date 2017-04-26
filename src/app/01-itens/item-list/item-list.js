'use strict';
angular
  .module('app')
  .component('itemList', {
    templateUrl: 'item-list.html',
    bindings: {
      itens: '=data',
      rows: '=',
      arrow: '='
    },
    controller: function () {

      var vm = this;

      vm.slickConfig = {
        method: {},
        event: {
          afterChange: function (event, slick, currentSlide/*, nextSlide*/) {
            vm.currentSlide = currentSlide / 3 + 1;
          },
          // init: function (event, slick) {
          // }
        }
      };

      vm.currentSlide = 1;

      // vm.setFilter = function (filter) {

      //   vm.loaded = false;

      //   vm.filter = angular.equals(vm.filter, filter) ? {} : filter;

      //   $timeout( function (argument) {
      //     vm.loaded = true;
      //   })
      // }

    }
  });
