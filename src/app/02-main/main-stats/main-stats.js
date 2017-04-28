'use strict';
angular.module('app')
  .controller('MainStatsController', function (teamStats) {

    var vm = this;

    vm.teamStats = teamStats;

    vm.slickConfig = {
      method: {},
      event: {
        afterChange: function (event, slick, currentSlide/*, nextSlide*/) {
          vm.currentSlide = currentSlide / 2 + 1;
        },
        init: function (event, slick) {
          vm.slideCount = slick.slideCount;
        }
      }
    };

    vm.currentSlide = 1;

  })
