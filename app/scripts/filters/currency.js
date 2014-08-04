angular.module('projetobrasilFrontApp')
  .filter('currencyFormat', function() {
    return function(number, symbol, decimal_sep, thousand_sep) {

      if(!number) return;

      var places = 2;
      symbol = symbol || "R$";
      thousand_sep = thousand_sep || ".";
      decimal_sep = decimal_sep || ",";

      var negative = number < 0 ? "-" : "",
          i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
          j = (j = i.length) > 3 ? j % 3 : 0;

      return symbol + ' ' + negative + (j ? i.substr(0, j) + thousand_sep : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand_sep) + (places ? decimal_sep + Math.abs(number - i).toFixed(places).slice(2) : "");

    };
  });
