'use strict';

angular.module('projetobrasilFrontApp')
  .controller('ProfilesCtrl', function ($scope, $state, $filter, $stateParams, $location, profileGetter) {
    var profileName = $stateParams.nameUrl || '',
        proposalId = $stateParams.proposalId || '';

    $scope.$parent.proposalId = proposalId;

    profileGetter.getProfile().then(function(profiles) {
      if(!profiles) return;

      profiles = $filter('orderBy')(profiles, 'nome_urna');
      $scope.$parent.profiles = profiles;
      $scope.$parent.setActiveByName(profileName);

    });

    $scope.$parent.setActiveByName = function(nameUrl) {
      var profiles = $scope.$parent.profiles;

      for (var i = 0; i < profiles.length; i++) {
        var p = profiles[i];
        if(p.nome_url === nameUrl) {
          $scope.$parent.selectedPolitical = p;
        }
      }
    };

    $scope.$parent.isActive = function(political) {
      return $state.current.name === 'profile' && $scope.$parent.selectedPolitical === political;
    };

  });

