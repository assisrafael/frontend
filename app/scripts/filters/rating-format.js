angular.module('projetobrasilFrontApp')
  .filter('ratingFormat', function() {
    return function(number, decimals, none_symbol, max_value) {
      if(!number) return;

      decimals = decimals || '2';
      none_symbol = none_symbol || '-';
      var value = isNaN(number) ? none_symbol : number.toFixed(2);
      if(max_value){
        value += (' / '+ max_value);
      }
      return value;
    };
  });
