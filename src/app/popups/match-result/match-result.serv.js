'use strict';
angular.module('app')
  .service('MatchResultService', function ($http, PostToJs, $loading) {

    var vm = this;

    // https://o2games-golaco.s3.amazonaws.com/matches/72/7202/720257/72025718.gol
    vm.matchData = function (matchId) {

      $loading.start('PostToJs');

      // var filePath = 'https://o2games-golaco.s3.amazonaws.com/matches/';
      var filePath = 'matches/';

      filePath +=
        Math.floor(matchId / 1000000).toString() + '/' +
        Math.floor(matchId / 10000).toString() + '/' +
        Math.floor(matchId / 100).toString() + '/';

      //fill file path with match id
      filePath += matchId.toString() + '.gol';

      return $http.get(filePath, {responseType: 'arraybuffer'})
        .then(function (data) {
          /* global pako */
          return pako.inflateRaw(data.data, {to: 'string'});
        })
        .then(function (tmpStr) {

          // var tmpStr:String = loader.data.toString();
          var begin = tmpStr.indexOf('&jsondata='),
            matchResponse = {};

          if (begin >= 0) {
            matchResponse.data = angular.fromJson(tmpStr.substr(begin + 10));
            matchResponse.data.Success = true;
          } else {
            //check for wo
            begin = tmpStr.indexOf('jsondata=');
            if (begin >= 0) {
              matchResponse.data = angular.fromJson(tmpStr.substr(begin + 9));

              if (matchResponse.data.HomeTeam.Name) {
                matchResponse.data.HomeTeam.Name = (matchResponse.data.HomeTeam.Name).replace('#A38', '&');
              }

              if (matchResponse.data.VisitorTeam.Name) {
                matchResponse.data.VisitorTeam.Name = (matchResponse.data.VisitorTeam.Name).replace('#A38', '&');
              }

              matchResponse.data.Success = true;
            }
            else {
              matchResponse.data = { Success: false };
            }
          }

          return matchResponse;

        });
        // .finally(function () {
        //   // $loading.finish('match');
        // });
    };

    // https://www.golacogame.com.br/Team/MatchWatched
    vm.setMatchWatched = function (IdMatch) {
      return PostToJs('Team/MatchWatched', {
        IdMatch: IdMatch
      });
    };
    vm.ignoreAllMatches = function () {
      return PostToJs('Team/IgnoreAllMatchesAlertView');
    };

  });
