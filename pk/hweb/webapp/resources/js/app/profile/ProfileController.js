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
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$rootScope', '$route', 'LocalStorage', 'QueryService'];

  function ProfileController($rootScope, $route, LocalStorage, QueryService) {
    var self = this;
    self.user = {};
    self.user.displayName = "Prakash";
    //$route.current.params
    //self.showProfileHeader = $route.current.controllerAs == 'wallet';
    // $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        // self.showProfileHeader = current.locals.$scope && current.locals.$scope.isProfile;
    // });
  }

})();