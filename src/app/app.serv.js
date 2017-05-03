'use strict';
angular.module('app')
.service('AppService', function ($http, $window) {

  this.auth = function () {
    return $http.get('/data/Container/Auth', {
      'socket_id': '215916.7788328',
      'channel_name': 'private-1602447546449533',
    });
  };

  this.userData = function () {

    $window.postToJs('userData', 'user_data_callback');

    // return $q(function(resolve, reject) {
    //     setTimeout(function() {
    //       if (okToGreet(name)) {
    //         resolve('Hello, ' + name + '!');
    //       } else {
    //         reject('Greeting ' + name + ' is not allowed.');
    //       }
    //     }, 1000);
    //   });

  };

  this.userVerify = function () {

    // action = "User/Verify",
    // callback = "user_verify_callback", data = Object {idCity: 0, idCountry: 0, idState: 0}, signed = true, cacheId = 1493774411010

    return $window.postToJs('User/Verify', 'user_verify_callback', {idCity: 0, idCountry: 0, idState: 0}, true, 1493774411010);

    // // application/x-www-form-urlencoded
    // return $http.get('/data/User/Verify'/*, {
    //   'locale': 'pt_BR',
    //   'data[idCity]': '0',
    //   'data[idCountry]': '0',
    //   'data[idState]': '0',
    //   'signature': 'BwyM92VpeYaRbSb7597EFXZAO2U=',
    //   'idSocialNetwork': '1602447546449533',
    //   'socialNetwork': '1',
    //   'v': '1492474465217',
    //   'refCode': '',
    // }*/);
  };

  this.teamPreview = function () {
    return $http.get('/data/Team/Preview'/*, {
      locale: 'pt_BR',
      signature: 'BwyM92VpeYaRbSb7597EFXZAO2U=',
      idSocialNetwork: '1602447546449533',
      socialNetwork: '1',
      v: '1492473859454',
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function (obj) {
        var str = [];
        for (var p in obj) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        return str.join('&');
      },
    }*/);
  };

  this.missionList = function () {
    return $http.get('/data/Mission/List');
  };

});
