'use strict';
angular.module('app')
.service('MainService', function ($http) {

  this.milhas = function () {
    return $http.post('/golaco/Container/Auth', {
      socket_id: '215916.7788328',
      channel_name: 'private-1602447546449533',
    });
  };

  this.userVerify = function () {
    // application/x-www-form-urlencoded
    return $http.post('/golaco/User/Verify', {
      'locale': 'pt_BR',
      'data[idCity]': '0',
      'data[idCountry]': '0',
      'data[idState]': '0',
      'signature': 'BwyM92VpeYaRbSb7597EFXZAO2U=',
      'idSocialNetwork': '1602447546449533',
      'socialNetwork': '1',
      'v': '1492474465217',
      'refCode': '',
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },
    });
  };

  this.milhas2 = function () {
    return $http.post('/golaco/Team/Preview', {
      locale: 'pt_BR',
      signature: 'BwyM92VpeYaRbSb7597EFXZAO2U=',
      idSocialNetwork: '1602447546449533',
      socialNetwork: '1',
      v: '1492473859454',
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },
    });
  };

});
