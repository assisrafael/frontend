'use strict';

var app = angular.module('projetobrasilFrontApp');

app.controller('ProfileCtlr', function ($scope, profileGetter, $filter, proposalsGetter) {

  profileGetter.getProfile().then(function(profiles) {
    $scope.profiles = profiles;
    $scope.currentPolitical = profiles[0];
  });

  $scope.updateProfileView = function(id){
    var temp_currentPolitical = $filter('filter')( $scope.profiles, {id: id}, true);
    if(temp_currentPolitical.length == 1){
      $scope.currentPolitical = temp_currentPolitical[0];
      angular.element('.activePolitical').removeClass('activePolitical');
      angular.element('#'+$scope.currentPolitical.id).addClass('activePolitical');

      $scope.proposals = proposalsGetter.getProposals(id);

    }
  }



});
