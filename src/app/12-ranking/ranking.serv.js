'use strict';
angular.module('app')
  .service('RankingService', function (PostToJs) {

    var vm = this;

    vm.getRanking = function (rankingType, filter, rankingFilters) {

      filter = angular.merge(angular.copy(filter || {}), rankingFilters || {});
      filter.page = 1;
      filter.qty = 10;
      filter.idCountry = filter.idCountry || 0;

      return PostToJs('Ranking/' + rankingType, filter);
    };

  });
