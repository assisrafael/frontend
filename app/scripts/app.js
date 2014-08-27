'use strict';

angular.module('projetobrasilFrontApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngTouch',
	'ui.router',
  'ui.bootstrap',
  'disqusHere',
  'http-auth-interceptor',
  'angular-loading-bar',
  'duScroll',
  'djds4rce.angular-socialshare',
  'ui-rangeSlider',
  'seo',
  'cfp.hotkeys',
  'angularytics'
])
.config(function(AngularyticsProvider) {
  AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
}).run(function(Angularytics) {
  Angularytics.init();
})
.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
 // $rootScope
 // .$on('$stateChangeSuccess', function(event){
 //    if (!$window.ga)
 //      return;
 //    $window.ga('send', 'pageview', { page: $location.path() });
 //  });

 $rootScope._ = window._;
 $rootScope.apiBaseUrl = 'http://api.projetobrasil.org:4242/v1/';
}])

.config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider, $locationProvider) {

	$urlRouterProvider.otherwise('/');
  $locationProvider.hashPrefix('!');

	$stateProvider
  .state('main', {
    url: '/',
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
	.state('_', {
		abstract: true,
		views: {
			'': {
				templateUrl: 'views/structure.html'
			},
			'navbar@_': {
				templateUrl: 'views/navbar.html'
			},
			'usermenu@_': {
				templateUrl: 'views/navbarusermenu.html',
				controller: 'NavbarUserMenuCtrl'
			},
			'sidebar@_': {
				templateUrl: 'views/sidebar.html',
				controller: 'SideBarProfilesCtrl'
			},
		}
	})
  .state('ranking', {
    url: '/ranking',
    templateUrl: 'views/politicians-ranking.html',
    controller: 'PoliticiansRankingCtrl'
  })
  .state('teste-cego', {
    url: '/teste-cego',
    views: {
      '': {
        templateUrl: 'views/teste-cego.html',
        controller: 'TesteCegoCtrl'
      },
      'navbar@teste-cego':{
        templateUrl: 'views/navbar.html',
      },
      'usermenu@teste-cego': {
        templateUrl: 'views/navbarusermenu.html',
        controller: 'NavbarUserMenuCtrl'
      }
    }
  })
	.state('profile', {
		parent: '_',
		url: '/cand/:nameUrl',
		views: {
			'': {
				templateUrl: 'views/profile.html',
				controller: 'ProfilesCtrl'
			},
      'proposals@profile': {
        templateUrl: 'views/proposals.html',
        controller: 'ProposalsCtrl'
      },
			'history@profile': {
        templateUrl: 'views/history.html',
        controller: 'HistoryCtrl'
      },
      'goods@profile': {
				templateUrl: 'views/goods.html',
				controller: 'GoodsCtrl'
			}
		}
	})
	.state('proposal-comparative', {
		parent: '_',
		url: '/proposal-comparative',
		controller: 'ProposalsComparativeCtrl',
		templateUrl: 'views/proposal-comparative.html'
	})
	.state('proposal', {
		parent: '_',
		url: '/cand/:nameUrl/prop/:proposalId',
    views: {
      '': {
        templateUrl: 'views/profile.html',
        controller: 'ProfilesCtrl'
      },
      'proposals@proposal': {
        templateUrl: 'views/proposal.html',
        controller: 'ProposalCtrl'
      },
      'history@proposal': {
        templateUrl: 'views/history.html',
        controller: 'HistoryCtrl'
      },
      'goods@proposal': {
        templateUrl: 'views/goods.html',
        controller: 'GoodsCtrl'
      }
    }
	});
	//FIXME: remover quando ui-router tiver parâmetros opcionais
	$urlRouterProvider.when('/profile', '/profile/');

	$sceDelegateProvider.resourceUrlWhitelist([
		// Allow same origin resource loads.
		'self',
		// Allow loading from our assets domain.	Notice the difference between * and **.
		'http://api.projetobrasil.org/**'
	]);

	// The blacklist overrides the whitelist so the open redirect here is blocked.
	// $sceDelegateProvider.resourceUrlBlacklist([
	//	 'http://myapp.example.com/clickThru**'
	// ]);
})
.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}]);;
