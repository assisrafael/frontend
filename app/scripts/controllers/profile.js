'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProfilesCtrl', function ($scope, $state, $filter, $stateParams, $location, profileGetter, UserRatings) {
  var profileName = $stateParams.nameUrl || '',
  proposalId = $stateParams.proposalId || '';

  $scope.$parent.proposalId = proposalId;

  profileGetter.getProfile().then(function(profiles) {
    if(!profiles) return;
    // $scope.userVotes = UserRatings.get();
    profiles = $filter('orderBy')(profiles, 'nome_urna');
    $scope.$parent.profiles = profiles;
    $scope.$parent.setActiveByName(profileName);

  });

  $scope.parseUrl = function(link){
    var url = document.createElement('a');
    url.href = link;
    return (url.hostname + url.pathname).replace('www.', '');
  }

  $scope.$parent.setActiveByName = function(nameUrl) {
    var profiles = $scope.$parent.profiles,
        og = {},
        politician = {};

    for (var i = 0; i < profiles.length; i++) {
      var p = profiles[i];
      if(p.nome_url === nameUrl) {
        $scope.$parent.selectedPolitical = p;
        politician = p;
      }
    }

    $scope.pageTitle = politician.nome_urna + " :: Projeto Brasil";
    $scope.og = {
      url : $location.absUrl(),
      siteName : 'projetobrasil.org',
      title : politician.nome_urna + ' - Projeto Brasil',
      description : 'Conheça as propostas, histórico politico e outras informações de '+politician.nome_urna+' no ProjetoBrasil.org',
      imageUrl : $location.protocol() + "://" +  $location.host() + politician.foto,
      imageWidth : '200',
      imageHeight : '200'
    };
  };

  $scope.$parent.isActive = function(political) {
    return $state.current.name === 'profile' && $scope.$parent.selectedPolitical === political;
  };

  $scope.url = $location.absUrl();
});
