'use strict';

var app = angular.module('projetobrasilFrontApp');

app.controller('ProfileCtlr', function ($scope, profileGetter) {


  profileGetter.getProfile().then(function(profiles) {
    $scope.profiles = profiles;
  });


});
