'use strict';
angular.module('app')
  .service('RankingService', function (PostToJs) {

    var vm = this;

    vm.rankingClear = function (filter) {

      filter = angular.copy(filter || {});
      filter.page = 1;
      filter.qty = 10;
      filter.idCountry = filter.idCountry || 0;

      return PostToJs('Ranking/RankingClear', filter);
    };

    vm.rankingSupporters = function (idCountry, idLeague) {
      return PostToJs('Ranking/Supporters', {
        idCountry: idCountry,
        idLeague: idLeague,
        page: 1,
        qty: 10,
      });
    };

  });
