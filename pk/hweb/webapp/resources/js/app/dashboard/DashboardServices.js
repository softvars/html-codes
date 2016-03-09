;(function() {

  angular
    .module('hypeweb')
    .factory('DashboardServices', DashboardServices);

  DashboardServices.$inject = ['$http', 'LocalStorage'];

  function DashboardServices($http, LocalStorage) {

    function loadData(){
       QueryService.query('GET', 'posts', {}, {})
        .then(function(ovocie) {
            self.ovocie = ovocie.data;
        });
    }
      
    return {
      loadData: loadData
    };
      
  }
})();
