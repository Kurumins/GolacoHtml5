'use strict';
angular.module('app')
  .service('FinancialService', function (PostToJs, moment) {

    var vm = this;

    vm.summary = function () {
      return PostToJs('Finance/FinancialSummary');
    };

    vm.transactionTypes = function () {
      return PostToJs('Finance/TransactionTypes');
    };

    vm.detail = function (typeId, beginDate, endDate) {
      return PostToJs('Finance/Detail', {
        TypeId: typeId || -1,
        BeginDate: beginDate || +moment().utc().add(-1, 'day').startOf('day'),
        EndDate: endDate || +moment().utc().endOf('day'),
      });
    };

    vm.sponsorProposals = function () {
      return PostToJs('Sponsor/SponsorProposals');
    };

    vm.sponsorChange = function (sponsor) {
      return PostToJs('Sponsor/Change', {
        SponsorId: sponsor.Id
      });
    };

  });
