(function() {

  angular
    .module('dashboardApp')
    .factory('LoadingService', LoadingService);

  LoadingService.$inject = ['$rootScope'];

  function LoadingService($rootScope) {
      var self = this;
      var TYPE = {};
      
      self.isOn = false;
      self.loadingGear = 0;
      
      function setLoading(isShow) {
         if(typeof isShow === 'boolean') {
            if(self.loadingGear == 0) {
                self.isOn = isShow;  
            }
         }
         return self.isOn;
      }
      
      function show() {
         setLoading(true);
         self.loadingGear ++;
         return self.isOn;
      }
      
      function hide() {
         if(self.loadingGear) {
            self.loadingGear = self.loadingGear > 0 ? self.loadingGear - 1 : 0;
         }
         return setLoading(false);
      }
      
      function getLoadingState() {
          return self.isOn;
      }
      
    return {
      type: TYPE,
      show: show,
      hide: hide,
      state: getLoadingState
    };
  }

})();
