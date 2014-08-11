'use strict';

angular.module('projetobrasilFrontApp')
  .factory('headerInfos', [function(){
      var title = 'Projeto Brasil',
          og = {
            'url' : 'http://www.projetobrasil.org',
            'siteName' : 'projetobrasil.org',
            'title' : 'Projeto Brasil',
            'description' : 'Seus próximos 4 anos serão impactados por uma decisão que demora menos de 4 segundos: o voto para presidente! Por isso conheça, compare e avalie propostas e candidatos no Projeto Brasil! A hora é essa!',
            'imageUrl' : 'http://www.projetobrasil.org/images/urna.jpg',
            'imageWidth' : '640',
            'imageHeight' : '304'
          };

      return {
       title: function() { return title; },
       setTitle: function(newTitle) { title = newTitle },
       ogTags: function(){ return og; },
       setOGTags: function(newOG){
          og.url = newOG.url;
          og.siteName = newOG.siteName;
          og.title = newOG.title;
          og.description = newOG.description;
          og.imageUrl = newOG.imageUrl;
          og.imageWidth = newOG.imageWidth;
          og.imageHeight = newOG.imageHeight;
       }
      };
    }]);
