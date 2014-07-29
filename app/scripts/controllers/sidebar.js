angular.module('projetobrasilFrontApp')
  .controller('SideBarProfilesCtrl', function ($scope, $state, $filter, profileGetter) {

    if(!$scope.$parent.profiles){
      profileGetter.getProfile().then(function(profiles) {
        if(!profiles) return;
        profiles = $filter('orderBy')(profiles, 'nome_urna');
        $scope.$parent.profiles = profiles;
      });
    }

    $scope.changePolitician = function (politician){
      $scope.$parent.selectedPolitical = politician;
      $state.go('profile', {
        nameUrl: $scope.$parent.selectedPolitical.nome_url
      });
    }

  });
