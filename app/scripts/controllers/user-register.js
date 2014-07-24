'use strict';

angular.module('projetobrasilFrontApp')
.controller('modalRegisterCtrl',
  function ($scope, UserRegister, $loginModalInstance, userInfo) {

    $scope.user = userInfo;

    $scope.register = function() {
      alert($scope.user.name);
      // UserRegister.register($scope.user,
      //   function() {
      //     $location.path('/');
      //   },
      //   function(err) {
      //   });
    };
  });


