'use strict';

angular.module('projetobrasilFrontApp')
  .service('categoryColorGetter', function(){
    this.getColorTheme = function(theme){
      var colors = {
         'Cultura e Turismo':'#8CD500',
         'Democracia e Reforma Política':'#C883FF',
         'Desenvolvimento Econômico':'#17A2DC',
         'Direitos Humanos e Inclusão social':'#D91B8B',
         'Educação':'#652D90',
         'Esporte e lazer':'#5E3209',
         'Gestão Pública':'#ED1D24',
         'Infraestrutura':'#062084',
         'Liberdades civis':'#1AE4B7',
         'Segurança Pública':'#F6A41C',
         'Meio-ambiente':'#38990C',
         'Política Economica':'#2E281D',
         'Política Externa e Defesa Nacional':'#FFCD06',
         'Políticas Sociais':'#959595',
         'Saúde':'#FFABEC',
         'Outros':'#1AE4B7'
      };

      if(colors[theme]){
        return colors[theme];
      }else{
        return '#1AE4B7';
      }
    }
  });
