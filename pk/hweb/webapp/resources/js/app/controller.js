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
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'LocalStorage', 'QueryService'];

  function HomeController($scop, LocalStorage, QueryService) {

    // 'controller as' syntax
    var self = this;
    $scop.msg = "Home";

    ////////////  function definitions
    /**
     * Load some data
     * @return {Object} Returned object
     */
    // QueryService.query('GET', 'posts', {}, {})
    //   .then(function(ovocie) {
    //     self.ovocie = ovocie.data;
    //   });
  }

})();