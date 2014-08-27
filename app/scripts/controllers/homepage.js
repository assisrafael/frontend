'use strict'

angular.module('projetobrasilFrontApp')
  .controller('HomepageCtrl', function($rootScope, $scope, $location, $log, profileGetter) {

    profileGetter.getProfile().then(function(profiles) {
        if(!profiles) return;
        $scope.politicos = profiles;

        $scope.pageTitle = "Projeto Brasil";
        $scope.og = {
          url : $location.absUrl(),
          siteName : 'projetobrasil.org',
          title : 'Projeto Brasil',
          description : 'Seus próximos 4 anos serão impactados por uma decisão que demora menos de 4 segundos: o voto para presidente! Por isso conheça, compare e avalie propostas e candidatos no Projeto Brasil! A hora é essa!',
          imageUrl : 'http://www.projetobrasil.org/images/urna.jpg',
          imageWidth : '640',
          imageHeight : '304'
        };
        $scope.htmlReady();

      });

  });
