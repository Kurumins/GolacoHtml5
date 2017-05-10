'use strict';
angular.module('app')
  .service('MatchResultService', function ($http) {

    var vm = this;

    vm.matchData = function (filter) {
      return $http.get('/data/72014544.gol', {responseType: 'arraybuffer'})
        .then(function(data) {
          return pako.inflateRaw(data.data, {to: 'string'});
        })
        .then(function (tmpStr) {

          // var tmpStr:String = loader.data.toString();
          var begin = tmpStr.indexOf("&jsondata="),
            matchResponse = {};

          if (begin >= 0) {
            matchResponse.data = JSON.parse(tmpStr.substr(begin + 10));
            matchResponse.data.Success = true;
          }
          else {
            //check for wo
            begin = tmpStr.indexOf("jsondata=");
            if (begin >= 0) {
              matchResponse.data = JSON.parse(tmpStr.substr(begin + 9));

              if (matchResponse.data.HomeTeam.Name)
                matchResponse.data.HomeTeam.Name = (matchResponse.data.HomeTeam.Name).replace("#A38", "&");

              if (matchResponse.data.VisitorTeam.Name)
                matchResponse.data.VisitorTeam.Name = (matchResponse.data.VisitorTeam.Name).replace("#A38", "&");

              matchResponse.data.Success = true;
            }
            else {
              matchResponse.data = { Success: false };
            }
          }

          return matchResponse;

        });

    };

  });
