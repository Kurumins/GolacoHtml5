'use strict';
angular.module('app')
  .config(calendarRoutesConfig);

function rankingController (RankingService) {
  var vm = this;

  vm.rankings = [
    {
      icon: '',
      label: 'rankingByCompetitions',
      service: 'RankingClear',
    },
    {
      icon: '',
      label: 'rankingBySupporters',
      service: 'Supporters',
      exclusion: {
        date: true
      }
    },
    {
      icon: '',
      label: 'rankingByAttendance',
      service: 'Attendence'
    },
    {
      icon: '',
      label: 'rankingByGeneralTitles',
      service: 'Titles',
      // filter: {
      //   IdCompetitionType: 0
      // }
    },
    {
      icon: '',
      label: 'rankingByLeagueTitles',
      service: 'Titles',
      filter: {
        IdCompetitionType: 1
      }
    },
    {
      icon: '',
      label: 'rankingByTournamentTitles',
      service: 'Titles',
      filter: {
        IdCompetitionType: 2
      }
    },
    {
      icon: '',
      label: 'rankingByCupTitles',
      service: 'Titles',
      filter: {
        IdCompetitionType: 3
      }
    },
    {
      icon: '',
      label: 'rankingByMiniTournamentTitles',
      service: 'Titles',
      filter: {
        IdCompetitionType: 4
      }
    },
    {
      icon: '',
      label: 'rankingByMiniCupTitles',
      service: 'Titles',
      filter: {
        IdCompetitionType: 5
      }
    },
    {
      icon: '',
      label: 'rankingByNegotiations',
      service: 'Negotiations',
      exclusion: {
        leagues: true
      }
    },
    {
      icon: '',
      label: 'rankingByWinningStreak',
      service: 'Invencibility',
      exclusion: {
        date: true
      }
    },
  ];

  vm.currentFilter = {};

  vm.setCurrentRanking = function (ranking) {
    vm.currentRanking = ranking;
    vm.filter(vm.currentFilter);
  };

  vm.filter = function () {
    RankingService.getRanking(vm.currentRanking.service, vm.general ? vm.currentFilter : {}, vm.currentRanking.filter)
      .then(function (ranking) {
        vm.ranking = ranking.Ranking;
        vm.me = ranking.Me;
        vm.lastUpdate = ranking.LastUpdate;
      });
  };

  vm.setCurrentRanking(vm.rankings[0]);

}

function calendarRoutesConfig ($stateProvider) {

  $stateProvider
    .state('app.ranking', {
      url: '/ranking',
      sticky: true,
      // resolve: {
      //   rankingClear: function (RankingService) {
      //     return RankingService.rankingClear();
      //   }
      // },
      templateUrl: 'ranking.html',
      controller: rankingController,
      controllerAs: '$ctrl'
    });
}
