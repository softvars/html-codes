;(function() {

  'use strict';

  /**
   * $http service abstraction to make API calls with any HTTP method,
   * custom url and data object to be sent as request.
   * Every REST API call is measured, you can see how much it took
   * in the console.
   *
   * @category  factory
   * @example   Inject QueryService as the dependency and then use it this way:
   *
   * QueryService.query('GET', 'users/user/', {get: query}, {post: params})
      .then(function(data) {
        console.log(data);
      }, function(error) {
        console.log(error);
      });
   *
   * @param     {String} method HTTP method, eg. 'PUT', 'GET'...
   * @param     {String} url API endpoint, eg. 'users/user' or 'system-properties'
   * @param     {Object} params Map of strings or objects which will be turned
   *                     to `?key1=value1&key2=value2` after the url. If the value
   *                     is not a string, it will be
   *                     JSONified
   * @return    {Object} data Data to be sent as the request message data
   *
   */

  angular
    .module('hypeweb')
    .factory('QueryService', [
      '$http', '$q', 'CONSTANTS', QueryService
    ]);

  function QueryService($http, $q, CONSTANTS) {

    var service = {
      query: query
    };

    return service;

    function query(config) {
      
      var deferred = $q.defer();
      /*{
        method: method,
        url: CONSTANTS.API_URL + url,
        params: params,
        data: data
      }*/
      
      config.url = CONSTANTS.API_URL + config.url;
        
      $http(config).then(function(data) {
        if (!(data && data.config)) {
          console.log('Server error occured.');
        }
        deferred.resolve(data);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }
  }

})();
