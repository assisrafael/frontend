'use strict';

angular.module('projetobrasilFrontApp')
  .service('categoryColorGetter', function(){
    this.getColorTheme = function(theme){
      var colors = {
        'Política Econômica' : '#8CD500',
        'Políticas Sociais' : '#38990C',
        'Saúde' : '#17A2DC',
        'Educação' : '#062084',
        'Segurança Pública' : '#652D90',
        'Infraestrutura' : '#5E3209',
        'Desenvolvimento Econômico' : '#ED1D24',
        'Gestão Pública' : '#D91B8B',
        'Direitos Humanos e Proteção de Minorias' : '#F6A41C',
        'Política Externa e Defesa Nacional' : '#C883FF',
        'Meio-ambiente' : '#2E281D',
        'Cultura' : '#FFCD06',
        'Esporte' : '#959595',
        'Turismo' : '#FFABEC'
      };

      if(colors[theme]){
        return colors[theme];
      }else{
        return '#1AE4B7';
      }
    }
  });
