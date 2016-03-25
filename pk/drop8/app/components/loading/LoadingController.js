/**
 * Loading controller for application
 *
 * we can use this controller to show / hide loading for the entire app 
 * 
 */

(function() {

  angular
    .module('dashboardApp')
    .controller('LoadingController', LoadingController);

  LoadingController.$inject = ['$rootScope', '$scope', 'LoadingService'];

  function LoadingController($rootScope, $scope, LoadingService) {
    var self = this;
    
    $scope.isLoadingOn = false;
  
    $scope.$on('loading:show', function(e) {
        $scope.isLoadingOn = LoadingService.show();
    });
    $scope.$on('loading:hide', function(e) {
        $scope.isLoadingOn = LoadingService.hide();
    });
  }

})();