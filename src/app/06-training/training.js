'use strict';
angular.module('app')
  .config(trainingRoutesConfig)
  .directive('skillValue', function () {
    return {
      scope: {
        skillValue: '='
      },
      template: '{{skillValue.Value || \'--\'}} <span ng-if="skillValue.addValue!==0" class="-{{skillValue.addValue > 0 ? \'add\' : \'dec\'}}">{{skillValue.addValue}}</span>'
    };
  })
  .directive('trainingLimit', function () {
    return {
      scope: {
        player: '=trainingLimit'
      },
      template: '<div title="Tempo restante: {{::time}}" ng-if="trainingStatus"><span style="width: {{::trainingStatus}}%"></span></div>',
      link: function (scope/*, element, attrs*/) {
        var now = +new Date;

        scope.trainingStatus = getTrainingStatus();
        scope.time = getTime();

        function getTrainingStatus () {
          var trainingLimit = (scope.player.TrainingLimitDate - now) / 1000;
          return trainingLimit > 0 ? 100 - trainingLimit / (24 * 60 * 60) * 100 : 0;
        }

        function getTime () {
          return new Date(1970, 0, 1, 0, 0, 0, scope.player.TrainingLimitDate - now).toTimeString().substring(0, 5);
        }

      }
    };
  });

function trainingController ($scope, $rootScope, teamPlayerList, trainingCenter, ngDialog, ConfirmPopup, TrainingService, TeamPlayerService) {
  var vm = this;

  vm.teamPlayers = playersWithAtributes(teamPlayerList.TeamPlayers);
  vm.trainingCenter = trainingCenter.TrainingCenter;

  function playersWithAtributes (teamPlayers) {
    angular.forEach(teamPlayers, function (player) {
      player.attributes = [];
      angular.forEach(player.Attributes, function (attribute) {
        attribute && player.attributes.push(attribute);
      });
    });
    return teamPlayers;
  }

  vm.toggleAll = function (toggleStatus) {
    angular.forEach(vm.teamPlayers, function (player) {
      if (!player.HasTrainingPlan) {
        player.checked = toggleStatus;
      }
    });

    vm.updateplayersListAtt();
  };

  vm.getTrainingLimit = function (player) {
    var trainingLimit = (player.TrainingLimitDate - new Date) / 1000;
    return trainingLimit > 0 ? trainingLimit : null;
  };

  vm.train = function () {
    ConfirmPopup.open('Treinamento', 'Deseja colocar o jogador para treinar? Esse plano de treino durará @1 horas e durante esse período o jogador não poderá treinar novamente.')
      .then(function () {

        var playerIds = [];
        var juniorIds = [];

        for (var i = 0; i < vm.teamPlayers.length; i++) {
          if (vm.teamPlayers[i].checked) {
            if (vm.teamPlayers[i].TeamPlayerType === 1) {
              playerIds.push(vm.teamPlayers[i].Id);
            } else {
              juniorIds.push(vm.teamPlayers[i].Id);
            }
          }
        }

        var tmpTrainPlan = '';

        for (var k = 0; k < 4; k++) {
          switch (vm['_btnType' + k]) {
            case 2:
              tmpTrainPlan += 'A';
              break;
            case 3:
              tmpTrainPlan += 'B';
              break;
            case 4:
              tmpTrainPlan += 'C';
              break;
            default:
              break;
          }
        }

        TrainingService.playerTrain(
          playerIds.join(','),
          vm.trainingCenter.IdTeamTrainCenter,
          tmpTrainPlan,
          juniorIds.join(',')
        )
          .then(function () {
            return TeamPlayerService.teamPlayerList();
          })
          .then(function (teamPlayerList) {
            vm.teamPlayers = playersWithAtributes(teamPlayerList.TeamPlayers);
            vm.updateplayersListAtt();
          });

      });
  };

  vm.refreshTraining = function (player) {
    ConfirmPopup.open('Adiantar treinamento', 'Por @1 créditos você poderá antecipar o treino de seu jogador, liberando-o para um novo treinamento imediatamente. Confirma?')
      .then(function () {
        TrainingService.refreshTraining(player)
          .then(function () {
            $rootScope.$emit('balanceUpdate');
            return TeamPlayerService.teamPlayerList();
          })
          .then(function (teamPlayerList) {
            vm.teamPlayers = playersWithAtributes(teamPlayerList.TeamPlayers);
            vm.updateplayersListAtt();
          });
      });
  };

  //----------- calculo de atributos --------

  vm._btnType0 = 1;
  vm._btnType1 = 1;
  vm._btnType2 = 1;
  vm._btnType3 = 1;

  // vm.toggleAll(true);

  vm.updateplayersListAtt = function () {

    var playersList = vm.teamPlayers;

    //base att level, primary or secondary habilits
    // var MAX_TRAINNINGS = 4;
    var PRIMARY = 'pri';
    var SECONDARY = 'sec';
    var baseAttLvl = {};
    baseAttLvl[PRIMARY] = 1;
    baseAttLvl[SECONDARY] = 1;//0.85;

    //trainning level
    var baseTrainLvl = {};
    baseTrainLvl[1] = 0.6;
    baseTrainLvl[2] = 0.63;
    baseTrainLvl[3] = 0.68;
    baseTrainLvl[4] = 0.70;
    baseTrainLvl[5] = 0.75;
    baseTrainLvl[6] = 0.77;
    baseTrainLvl[7] = 0.82;
    baseTrainLvl[8] = 0.9;
    baseTrainLvl[9] = 1;

    //top trainning level
    var baseTopTrainLvl = {};
    baseTopTrainLvl[1] = 15;
    baseTopTrainLvl[2] = 25;
    baseTopTrainLvl[3] = 35;
    baseTopTrainLvl[4] = 50;
    baseTopTrainLvl[5] = 60;
    baseTopTrainLvl[6] = 75;
    baseTopTrainLvl[7] = 85;
    baseTopTrainLvl[8] = 95;
    baseTopTrainLvl[9] = 100;

    //Number of trainnings bonus
    var baseTrainNum = {};
    baseTrainNum[1] = 1.09;
    baseTrainNum[2] = 1.06;
    baseTrainNum[3] = 1.03;
    baseTrainNum[4] = 1;

    //player potencial
    var basePotencial = {};
    basePotencial[1] = 0.8;
    basePotencial[2] = 0.85;
    basePotencial[3] = 0.9;
    basePotencial[4] = 0.95;
    basePotencial[5] = 1;

    //player age
    var baseAge = {};
    baseAge[16] = 1.0; baseAge[17] = 1.0; baseAge[18] = 1.0;
    baseAge[19] = 1.0; baseAge[20] = 1.0; baseAge[21] = 1.0;
    baseAge[22] = 1.0; baseAge[23] = 1.0; baseAge[24] = 1.0;
    baseAge[25] = 1.0; baseAge[26] = 1.0; baseAge[27] = 1.0;
    baseAge[28] = 1.0; baseAge[29] = 0.85; baseAge[30] = 0.85;
    baseAge[31] = 0.85; baseAge[32] = 0.85; baseAge[33] = 0.75;
    baseAge[34] = 0.75; baseAge[35] = 0.75; baseAge[36] = 0.75;
    baseAge[37] = 0.75; baseAge[38] = 0.75; baseAge[39] = 0.75;

    //calc bases selecteds
    var baseAdd = 1;
    var baseIncAtt = {};

    var baseDec = 0.25;
    var baseDecAtt = {};

    //check if there is training plan
    var trainingPlanExist = false;
    var countNumTrainer = 0;
    for (var i = 0; i < 4; i++) {
      if (vm['_btnType' + i] !== 1) {
        trainingPlanExist = true;
        countNumTrainer++;
      }
    }

    //number of playersList
    var baseNumplayersList = 1.32; //base 30% more if trainning 1 player, 2% less for each player added
    for (i = 0; i < playersList.length; i++) {
      if (playersList[i].checked) {
        if (baseNumplayersList > 1) {
          baseNumplayersList -= 0.02;
        }
      }
    }

    //enable train btn
    vm.canTrain = (trainingPlanExist && baseNumplayersList < 1.32);

    //update all playersList
    for (i = 0; i < playersList.length; i++) {  //calc for each player
      if (playersList[i].checked && !playersList[i].HasTrainingPlan && trainingPlanExist) {
        //calc the base att lvl for each player, becouse goalkeeper is diferent
        //base inc
        baseIncAtt[0] = 0;  //0 = Hab 1
        baseIncAtt[1] = 0;  //1 = Hab 2
        baseIncAtt[2] = 0;  //2 = Tec
        baseIncAtt[3] = 0;  //3 = Vel
        baseIncAtt[4] = 0;  //4 = Res
        baseIncAtt[5] = 0;  //5 = Pas
        baseIncAtt[6] = 0;  //6 = Dri
        //base dec
        baseDecAtt[0] = 0;  //0 = Hab 1
        baseDecAtt[1] = 0;  //1 = Hab 2
        baseDecAtt[2] = 0;  //2 = Tec
        baseDecAtt[3] = 0;  //3 = Vel
        baseDecAtt[4] = 0;  //4 = Res
        baseDecAtt[5] = 0;  //5 = Pas
        baseDecAtt[6] = 0;  //6 = Dri
        for (var k = 0; k < 4; k++) {
          switch (vm['_btnType' + k]) {
            case 2:
              baseIncAtt[0] += baseAdd;
              baseIncAtt[1] += baseAdd;
              baseDecAtt[4] += baseDec;
              break;
            case 3:
              baseIncAtt[3] += baseAdd;
              baseIncAtt[4] += baseAdd;
              baseDecAtt[2] += baseDec;
              break;
            case 4:
              if (playersList[i].idPosition !== 1) { //if hes is not goalkeeper
                baseIncAtt[2] += baseAdd;
                baseIncAtt[5] += baseAdd;
                baseIncAtt[6] += baseAdd;
                baseDecAtt[3] += baseDec;
                baseDecAtt[4] += baseDec;
              } else {
                baseIncAtt[2] += baseAdd;
                baseIncAtt[5] += baseAdd;
                baseDecAtt[4] += baseDec;
              }
              break;
            default:
              break;
          }
        }
        for (var j = 0; j < playersList[i].attributes.length; j++) { //calc for each att
          var points = 0;
          if (baseIncAtt[j] > 0) {  //if add points
            var tmpBaseAttLvl = baseAttLvl[PRIMARY];
            if (j > 1) { //if tranning secondary habilits
              tmpBaseAttLvl = baseAttLvl[SECONDARY];
            }
            //calc top trainning level
            var trainLvl;
            var tmpTrainLvl = vm.trainingCenter['TeamPlayerSkill' + playersList[i].attributes[j].Id + 'Level'];
            // switch (j) {
            //   case 0:
            //     tmpTrainLvl = uint(this["_skill_value_" + playersList[i].attributesHab1Id].text);
            //     break;
            //   case 1:
            //     tmpTrainLvl = uint(this["_skill_value_" + playersList[i].attributesHab2Id].text);
            //     break;
            //   case 2:
            //     tmpTrainLvl = uint(_skill_value_7.text);
            //     break;
            //   case 3:
            //     tmpTrainLvl = uint(_skill_value_2.text);
            //     break;
            //   case 4:
            //     tmpTrainLvl = uint(_skill_value_3.text);
            //     break;
            //   case 5:
            //     tmpTrainLvl = uint(_skill_value_6.text);
            //     break;
            //   case 6:
            //     tmpTrainLvl = uint(_skill_value_5.text);
            //     break;
            //   default:
            //     tmpTrainLvl = 1;
            //     break;
            // }
            trainLvl = baseTrainLvl[tmpTrainLvl];

            //if player att value > top trainning lvl value
            if (Number(playersList[i].attributes[j]) > baseTopTrainLvl[tmpTrainLvl]) {
              trainLvl = trainLvl * 0.3;  //goes back to trainning lvl 1
            }
            //calc points
            points = baseIncAtt[j] *  //base to calc
                  tmpBaseAttLvl * //base att lvl(primary or secondary
                  trainLvl * //base lvl with top limit applyed
                  basePotencial[playersList[i].Potential] * //potencial base
                  baseAge[playersList[i].Age] * //base age
                  baseNumplayersList *  //base num playersList
                  baseTrainNum[countNumTrainer];  //base num of trainning bonus
          }
          if (baseDecAtt[j] > 0) {  //if remove points
            points -= baseDecAtt[j];
          }

          if (points === 0) {
            playersList[i].attributes[j].addValue = 0;
          } else {
            playersList[i].attributes[j].addValue = parseInt(points * 10) / 10;
          }

        }

      } else {
        for (var j2 = 0; j2 < playersList[i].attributes.length; j2++) { //calc for each att
          playersList[i].attributes[j2].addValue = 0;
        }
      }
    }
  };

  vm.toggleAll(vm.checkAll = true);

}

function trainingRoutesConfig ($stateProvider) {

  $stateProvider
    .state('app.training', {
      url: '/training',
      resolve: {
        teamPlayerList: function (TeamPlayerService) {
          return TeamPlayerService.teamPlayerList();
        },
        trainingCenter: function (TrainingService) {
          return TrainingService.trainingManage();
        },
      },
      templateUrl: 'training.html',
      controller: trainingController,
      controllerAs: '$ctrl'
    });
}
