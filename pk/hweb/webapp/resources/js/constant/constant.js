;(function() {


	/**
	 * Place to store API URL or any other constants
	 * Usage:
	 *
	 * Inject CONSTANTS service as a dependency and then use like this:
	 * CONSTANTS.API_URL
	 */
  angular
  	.module('hypeweb')
    .constant('CONSTANTS', {
      'API_URL_BASE': 'http://www.yourAPIurl.com/',
      'API_URL': 'http://192.50.51.84:7010/hypeweb/'
    });


})();
