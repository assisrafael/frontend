'use strict';

angular.module('projetobrasilFrontApp')
.directive('profile', function(){
	return {
		restrict: 'E',
		templateUrl: 'views/profile.html'
	};
})
.directive('proposals', function(){
	return {
		restrict: 'E',
		templateUrl: 'views/proposals.html'
	};
})
.directive('usermenu', function () {
	return {
		templateUrl: 'views/navbarusermenu.html',
		restrict: 'E'
	};
});
