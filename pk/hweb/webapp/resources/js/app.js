/**
 * 
 * Hype Web
 * @description           <Description>
 * @author                
 * @url                   
 * @version               
 * @date                  March 2016
  * 
 */
;(function() {

    
  angular.module('hypeweb', [
        'ngRoute',
        'ui.bootstrap'
   ]).config(config);

  // safe dependency injection  // this prevents minification issues
  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   * 
   */
  function config($routeProvider, $locationProvider, $httpProvider, $compileProvider) {

    $locationProvider.html5Mode(false);

    // routes
    $routeProvider
      .when('/dashboard', {
        templateUrl: '/resources/views/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'dashboard'
      })
      .when('/carte', {
        templateUrl: '/resources/views/wallet.html',
        controller: 'WalletController',
        controllerAs: 'wallet'
      })
      .when('/carte/add', {
        templateUrl: '/resources/views/wallet.html',
        controller: 'WalletController',
        controllerAs: 'wallet'
      })
      .otherwise({
        redirectTo: '/dashboard'
      });

    //$httpProvider.interceptors.push('authInterceptor');

  }

  /**
   * You can intercept any request or response inside authInterceptor
   * or handle what should happend on 40x, 50x errors
   * 
   */
/*  angular
    .module('hypeweb')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

  function authInterceptor($rootScope, $q, LocalStorage, $location) {

    return {

      // intercept every request
      request: function(config) {
        config.headers = config.headers || {};
        return config;
      },

      // Catch 404 errors
      responseError: function(response) {
        if (response.status === 404) {
          $location.path('/');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }*/


  /**
   * Run block
   */
  angular
    .module('hypeweb')
    .run(run);

  run.$inject = ['$rootScope', '$location'];

  function run($rootScope, $location) {
    
      $rootScope.templates = {
        header          : 'views/header.html',
        navmenu         : 'views/nav-menu.html',
        msg_container   : 'views/msg-container.html',
        profilo_header  : 'views/profile-header.html',
        app_ad          : 'views/app-ad.html',
        /*body            : 'views/header.html',*/
        footer          : 'views/footer.html',
        overlay         : 'views/overlay.html',
        contacts        : 'views/contacts-info.html',
        support         : 'views/support.html',
        faq             : 'views/faq.html',
        tnc             : 'views/terms-conditions-and-privacy-policy.html',
        privacy_contetnt: 'views/privacy-policy-contetnt.html',
        privacy         : 'views/privacy.html',
         
        wallet_list        : 'views/wallet-list.html',
        wallet_add         : 'views/wallet-add.html'
      };
  }

})();