'use strict';

angular.module('projetobrasilFrontApp')
.controller('NavbarUserMenuCtrl', function ($scope) {
	$scope.user = {
		firstName : 'João Silva',
		avatarUrl : 'images/avatars/users/augusto.jpg'
	};
});
