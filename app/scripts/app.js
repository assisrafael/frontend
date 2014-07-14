'use strict';

angular
  .module('projetobrasilFrontApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider, $sceDelegateProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

     $sceDelegateProvider.resourceUrlWhitelist([
       // Allow same origin resource loads.
       'self',
       // Allow loading from our assets domain.  Notice the difference between * and **.
       'http://api.projetobrasil.org/**'
     ]);

     // The blacklist overrides the whitelist so the open redirect here is blocked.
     // $sceDelegateProvider.resourceUrlBlacklist([
     //   'http://myapp.example.com/clickThru**'
     // ]);
   });
