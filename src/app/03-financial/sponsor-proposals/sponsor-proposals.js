'use strict';
angular.module('app')
  .controller('SponsorProposalsController', function ($scope, sponsorProposals, FinancialService, AlertPopup, AppService) {
    var vm = this;
    vm.scope = $scope;

    vm.sponsors = sponsorProposals.Sponsors;
    vm.sponsorTeam = sponsorProposals.SponsorTeam;

    vm.myLeague = AppService.teamPreview.Serie;

    vm.hire = function (sponsor) {
      FinancialService.sponsorChange(sponsor)
        .then(function (result) {
          AlertPopup.open('SponsorDetail.signContractSuccessTitle', 'SponsorDetail.signContractSuccessMessage;' + sponsor.Name + ';' + result.Money);
          vm.scope.confirm();
        });
    };

  })
  .factory('SponsorProposals', function (ngDialog, FinancialService) {

    this.open = function ($scope) {
      return ngDialog.openConfirm({
        template: 'sponsor-proposals.html',
        appendClassName: 'ngdialog-sponsor-proposals',
        controller: 'SponsorProposalsController as $ctrl',
        scope: $scope,
        resolve: {
          sponsorProposals: function () {
            return FinancialService.sponsorProposals();
          }
        }
      });
    };

    return this;

  });
