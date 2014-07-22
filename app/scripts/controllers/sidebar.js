angular.module('projetobrasilFrontApp')
  .controller('SideBarProfilesCtrl', function($scope, $state, $filter, profileGetter) {
    profileGetter.getProfile().then(function(profiles) {
      profiles = $filter('orderBy')(profiles, 'nome_urna');
      $scope.$parent.profiles = profiles;
    });

    $scope.$parent.isActive = function(political) {
      return $state.current.name === 'profile' && $scope.currentPolitical === political;
    };

    $scope.$parent.setActive = function(political) {
      $scope.currentPolitical = political;
      $scope.$parent.selectedPolitical = political;
      $state.go('profile', {
        profileId: political.id
      });
    };
  });