'use strict';

angular.module('projetobrasilFrontApp')
.controller('userRegisterCtrl',
['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
   /* $scope.role = Auth.userRoles.user;
    $scope.userRoles = Auth.userRoles;*/

    $scope.register = function() {
        Auth.register({
                username: $scope.username,
                password: $scope.password,
                //role: $scope.role
            },
            function() {
                $location.path('/profile');
                alert('oi');
            },
            function(err) {
                $rootScope.error = err;
            });
    };
}]);
