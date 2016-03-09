/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

  angular
    .module('hypeweb')
    .controller('NavigationController', NavigationController);

  NavigationController.$inject = ['$rootScope', '$route', 'LocalStorage', 'QueryService'];

  function NavigationController($rootScope, $route, LocalStorage, QueryService) {
    var self = this;
    self.user = {};
    self.user.displayName = "Prakash";

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        self.showProfileHeader = current.locals.$scope && current.locals.$scope.showProfileHeader;
        self.showAppAd = current.locals.$scope && current.locals.$scope.showAppAd;
    });
  }

})();