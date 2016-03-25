(function(){
 angular
 .module('dashboardApp')
 .factory('queryService',queryService);

 queryService.$inject=['$rootScope', '$http', '$q', 'CONSTANTS'];
 function queryService($rootScope,$http,$q,CONSTANTS){
     var service = {
      query: query
    };

    return service;
     function query(config) {
      
      var deferred = $q.defer();
       config.url = CONSTANTS.API_URL + config.url;
          $http(config).then(function(data){
       if (!(data && data.config)) {
    		  console.log('Server error occured.');
    	  }
    	  deferred.resolve(data);
         
      }, function(error) {
    	  deferred.reject(error);
         
      }, function() {
          
      })
          return deferred.promise;
     };
 
 };
    

})();