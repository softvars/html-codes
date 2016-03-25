(function() {
  angular
    .module('dashboardApp')
    .controller('AlertController', AlertController);

  AlertController.$inject = ['$rootScope', '$scope', 'AlertService'];

  function AlertController($rootScope, $scope, AlertService) {
    var self = this;
      
    $scope.alerts = AlertService.get();
    $scope.close = AlertService.close;
      
    $rootScope.$on('alert', function(e, msg, type) {
        $scope.alerts = AlertService.add(msg, type);
        stopPropagation(e);
    });

    $rootScope.$on('alert:success', function(e, msg) {
        $scope.alerts = AlertService.addSuccess(msg);
        stopPropagation(e);
    });
      
    $rootScope.$on('alert:error', function(e, msg) {
        $scope.alerts = AlertService.addError(msg);
        stopPropagation(e);
    });
      
    function stopPropagation(e){
        if(angular.isFunction(e.stopPropagation)) {
            e.stopPropagation();
        }
    }
      
  }

})();