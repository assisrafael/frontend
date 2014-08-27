'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProfilesCtrl', function ($scope, $state, $filter, $stateParams, $location, profileGetter, UserRatings, headerInfos) {
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

    og['url'] =  $location.absUrl();
    og['siteName'] =  'projetobrasil.org';
    og['title'] = politician.nome_urna + ' - Projeto Brasil';
    og['description'] =  'Conheça as propostas, histórico politico e outras informações de (nome do candidato) no ProjetoBrasil.org';
    og['imageUrl'] = $location.protocol() + "://" +  $location.host() + politician.foto;
    og['imageWidth'] =  '200';
    og['imageHeight'] =  '200';

    headerInfos.setTitle(politician.nome_urna + " :: Projeto Brasil");
    headerInfos.setOGTags(og);
    $scope.htmlReady();
  };

  $scope.$parent.isActive = function(political) {
    return $state.current.name === 'profile' && $scope.$parent.selectedPolitical === political;
  };

  $scope.url = $location.absUrl();
});
