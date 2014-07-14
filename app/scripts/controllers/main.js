'use strict';

var app = angular.module('projetobrasilFrontApp');

app.controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

app.directive('navbar', function(){
	return {
		restrict: 'E',
		templateUrl: 'views/partials/navbar.html'
	};
});
app.directive('profile', function(){
	return {
		restrict: 'E',
		templateUrl: 'views/partials/profile.html'
	};
});
app.directive('proposals', function(){
	return {
		restrict: 'E',
		templateUrl: 'views/partials/proposals.html'
	};
});
app.directive('usermenu', function () {
    return {
      templateUrl: 'views/partials/navbarusermenu.html',
      restrict: 'E'
    };
  });
