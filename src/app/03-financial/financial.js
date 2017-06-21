'use strict';
angular.module('app')
  .config(financialRoutesConfig);

function financialController (summary) {

  var vm = this;

  vm.financeSummary = summary.Finance;
  vm.sponsorSummary = summary.Sponsor;

  vm.financeFields = {
    lblFinSponsor: 'SponsorIncome',
    lblFinGame: 'CompetitionIncome',
    lblFinSalary: 'TeamPlayerSalarySpending',
    lblFinStructure: 'StructuresSpending',
    lblFinOther: 'OtherSpending'
  }

}

function financialRoutesConfig ($stateProvider) {

  $stateProvider
    .state('app.financial', {
      url: '/financial',
      resolve: {
        summary: function (FinancialService) {
          return FinancialService.summary();
        }
      },
      templateUrl: 'financial.html',
      controller: financialController,
      controllerAs: '$ctrl'
    });

}
