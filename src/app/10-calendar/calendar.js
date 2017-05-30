'use strict';
angular.module('app')
  .config(calendarRoutesConfig);

function calendarController (matchCalendar) {
  var vm = this;

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
