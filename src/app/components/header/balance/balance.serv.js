'use strict';
angular.module('app')
.service('BalanceService', function (PostToJs) {

  this.headerUserData = function () {
    return PostToJs('Team/HeaderUserData');
  };

  this.buyMoney = function () {
    return PostToJs('buyMoney');
  };

  // this.buyMoney = function () {
  //   return PostToJs('Buy/Options');
  // };

});
