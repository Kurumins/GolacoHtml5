'use strict';
angular.module('app')
  .controller('FinancialDetailsController', function (transactionTypes, detail, FinancialService) {

    var vm = this;
    vm.transactionTypes = [{
      Id: -1,
      Name: 'lblCbPrompt'
    }].concat(transactionTypes.TransactionTypes);
    vm.detail = detail;

    vm.periods = [
      { label: 'periodCB1', daysBefore: 1, daysAfter: 2},
      { label: 'periodCB2', daysBefore: 0, daysAfter: 7},
      { label: 'periodCB3', daysBefore: 3, daysAfter: 0},
      { label: 'periodCB4', daysBefore: 7, daysAfter: 0},
      { label: 'periodCB5', daysBefore: 21, daysAfter: 0}
    ];
    vm.currentPeriod = vm.periods[0];

    vm.transactionType = -1;

    // vm.startDate = moment().startOf('day').add(-1, 'days').toDate();
    // vm.endDate = moment().startOf('day').add(3, 'days').toDate();

    vm.setPeriod = function (period) {
      vm.startDate = moment().utc().add(-period.daysBefore, 'days').toDate();
      vm.endDate = moment().utc().add(period.daysAfter, 'days').toDate();
    };
    vm.setPeriod(vm.currentPeriod);

    vm.search = function () {
      FinancialService.detail(vm.transactionType, +moment(vm.startDate).startOf('day'), +moment(vm.endDate).endOf('day'))
        .then(function (detail) {
          vm.detail = detail;
        })
    };

  })
  .factory('FinancialDetails', function (ngDialog, FinancialService) {

    this.open = function ($scope) {
      return ngDialog.openConfirm({
        template: 'financial-details.html',
        appendClassName: 'ngdialog-financial-details',
        controller: 'FinancialDetailsController as $ctrl',
        scope: $scope,
        resolve: {
          transactionTypes: function () {
            return FinancialService.transactionTypes();
          },
          detail: function () {
            return FinancialService.detail();
          }
        }
      });
    };

    return this;

  });
