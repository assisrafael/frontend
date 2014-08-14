'use strict';

angular.module('projetobrasilFrontApp')
  .service('categoryColorGetter', function(){
    this.getColorTheme = function(theme){
      var colors = {
         'Cultura e Turismo':'rgba(140, 213, 0, 0.7)',
         'Democracia e Reforma Política':'rgba(200, 131, 255, 0.7)',
         'Desenvolvimento Econômico':'rgba(23, 162, 220, 0.7)',
         'Direitos Humanos e Inclusão social':'rgba(217, 27, 139, 0.7)',
         'Educação':'rgba(101, 45, 144, 0.7)',
         'Esporte e lazer':'rgba(94, 50, 9, 0.7)',
         'Gestão Pública':'rgba(237, 29, 36, 0.7)',
         'Infraestrutura':'rgba(6, 32, 132, 0.7)',
         'Liberdades civis':'rgba(26, 228, 183, 0.7)',
         'Segurança Pública':'rgba(246, 164, 28, 0.7)',
         'Meio-ambiente':'rgba(56, 153, 12, 0.7)',
         'Política Economica':'rgba(46, 40, 29, 0.7)',
         'Política Externa e Defesa Nacional':'rgba(255, 205, 6, 0.7)',
         'Políticas Sociais':'rgba(149, 149, 149, 0.7)',
         'Saúde':'rgba(255, 171, 236, 0.7)',
         'Outros':'rgba(26, 228, 183, 0.7)'
      };

      if(colors[theme]){
        return colors[theme];
      }else{
        return 'rgba(26, 228, 183, 0.7)';
      }
    }
  });


// Cores Originais
/*

  #8CD500
  #C883FF
  #17A2DC
  #D91B8B
  #652D90
  #5E3209
  #ED1D24
  #062084
  #1AE4B7
  #F6A41C
  #38990C
  #2E281D
  #FFCD06
  #959595
  #FFABEC
  #1AE4B7

*/
