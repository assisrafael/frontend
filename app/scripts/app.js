'use strict';

angular.module('projetobrasilFrontApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngTouch',
	'ui.router'
])
.config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
	$urlRouterProvider.otherwise('/');

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
	.state('profile', {
		parent: '_',
		url: '/profile/:profileId',
		views: {
			'': {
				templateUrl: 'views/profile.html',
				controller: 'ProfilesCtrl'
			},
			'proposals@profile': {
				templateUrl: 'views/proposals.html',
				controller: 'ProposalsCtrl'
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
		url: '/proposal',
		controller: 'ProposalCtrl',
		templateUrl: 'views/proposal.html'
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
});
