'use strict';
angular.module('app')
  .config(calendarRoutesConfig);

function calendarController (matchCalendar, CalendarService, MatchResult, moment) {
  var vm = this;

  vm.periods = [
    { label: 'periodCB1', daysBefore: 1, daysAfter: 2},
    { label: 'periodCB2', daysBefore: 0, daysAfter: 7},
    { label: 'periodCB3', daysBefore: 3, daysAfter: 0},
    { label: 'periodCB4', daysBefore: 7, daysAfter: 0},
    { label: 'periodCB5', daysBefore: 21, daysAfter: 0}
  ];
  vm.currentPeriod = vm.periods[0];

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
  };

  vm.types = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    100: true,
    101: true
  };

  vm.matchCalendar = matchCalendar;
  vm.matches = matchCalendar.Matches;

  vm.startDate = moment().startOf('day').add(-1, 'days').toDate();
  vm.endDate = moment().startOf('day').add(3, 'days').toDate();

  vm.setPeriod = function (period) {
    vm.startDate = moment().utc().startOf('day').add(-period.daysBefore, 'days').toDate();
    vm.endDate = moment().utc().endOf('day').add(period.daysAfter, 'days').toDate();
  };

  vm.searchGames = function () {

    var types = [];

    angular.forEach(vm.types, function (type, key) {
      if (type) {
        types.push(key);
      }
    });

    CalendarService.matchCalendar(+vm.startDate, +vm.endDate, types.join(';'))
      .then(function (matchCalendar) {
        vm.matchCalendar = matchCalendar;
        vm.matches = matchCalendar.Matches;
      });
  };

  vm.matchResult = MatchResult.open;

}

function calendarRoutesConfig ($stateProvider, moment) {

  $stateProvider
    .state('app.calendar', {
      url: '/calendar',
      resolve: {
        matchCalendar: function (CalendarService) {
          return CalendarService.matchCalendar(
            +moment().startOf('day').add(-1, 'days'),
            +moment().startOf('day').add(3, 'days'),
            '1;2;3;4;5;7;100;101'
          );
        }
      },
      templateUrl: 'calendar.html',
      controller: calendarController,
      controllerAs: '$ctrl'
    });
}
