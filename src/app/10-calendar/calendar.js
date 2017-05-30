'use strict';
angular.module('app')
  .config(calendarRoutesConfig);

function calendarController (matchCalendar) {
  var vm = this;

  vm.traversal = {
    1: 'league',
    2: 'tournament',
    3: 'cup',
    4: 'mini tournament',
    5: 'mini cup',
    6: 'copa nordeste',
    7: 'tournament beta',
    100: 'friendly',
    101: 'friendly',
  }

  vm.matchCalendar = matchCalendar;
  vm.matches = matchCalendar.Matches;
}

function calendarRoutesConfig ($stateProvider) {

  $stateProvider
    .state('app.calendar', {
      url: '/calendar',
      resolve: {
        matchCalendar: function (CalendarService) {
          return CalendarService.matchCalendar(
            +moment().hour(0).minute(0).second(0).millisecond(0).add(-1,'days'),
            +moment().hour(0).minute(0).second(0).millisecond(0).add(3,'days'),
            '1;2;3;4;5;7;100;101'
          );
        }
      },
      templateUrl: 'calendar.html',
      controller: calendarController,
      controllerAs: '$ctrl'
    });
}
