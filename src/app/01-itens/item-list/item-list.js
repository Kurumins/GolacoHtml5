'use strict';
angular
  .module('app')
  .component('itemList', {
    templateUrl: 'item-list.html',
    controller: function (ItensService, $timeout) {

      var vm = this;

      vm.slickConfig = {
        method: {},
        event: {
          afterChange: function (event, slick, currentSlide, nextSlide) {
            vm.currentSlide = currentSlide / 3 + 1;
          },
          init: function (event, slick) {
          }
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

      ItensService.inventory()
        .then(function (result) {
          vm.inventory = result.data.data;
        });

      ItensService.storeList()
        .then(function (result) {
          vm.storeList = result.data.data;
          // vm.loaded = true;
        });


    }
  });
