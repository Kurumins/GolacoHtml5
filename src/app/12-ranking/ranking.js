'use strict';
angular.module('app')
  .config(calendarRoutesConfig);

function rankingController (rankingClear, RankingService) {
  var vm = this;

  vm.ranking = rankingClear.Ranking;
  vm.me = rankingClear.Me;

  vm.filters = [
    {
      icon: '',
      label: 'Geral',
      service: 'rankingClear'
    }
  ];

  vm.filter = function (filters) {
    console.log(filters);
    // RankingService.rankingClear(filters);
  };

}

function calendarRoutesConfig ($stateProvider) {

  $stateProvider
    .state('app.ranking', {
      url: '/ranking',
      sticky: true,
      resolve: {
        rankingClear: function (RankingService) {
          return RankingService.rankingClear();
        }
      },
      templateUrl: 'ranking.html',
      controller: rankingController,
      controllerAs: '$ctrl'
    });
}
