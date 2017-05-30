'use strict';
angular.module('app')
  .component('itemList', {
    templateUrl: 'item-list.html',
    bindings: {
      itens: '=data',
      rows: '=',
      cols: '=',
      arrow: '=',
      equip: '=',
      confirm: '='
    },
    controller: itemListController
  });

function itemListController ($scope) {

  var vm = this;

  vm.slickConfig = {
    method: {},
    event: {
      afterChange: function (event, slick, currentSlide/*, nextSlide*/) {
        vm.currentSlide = currentSlide / (vm.cols || 3) + 1;
      },
      // init: function (event, slick) {
      // }
    }
  };

  vm.currentSlide = 1;

  $scope.$watch('itens', function (/*newValue, oldValue*/) {
    // debugger;
    vm.totalSlides = parseInt((vm.itens.length + (vm.rows * (vm.cols || 3)) - 1) / (vm.rows * (vm.cols || 3)));
  });

}
