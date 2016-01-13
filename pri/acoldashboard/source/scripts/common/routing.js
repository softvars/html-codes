//var app = angular.module('acolApp', [ 'ngRoute', 'smart-table','ngAnimate', 'ui.bootstrap','$location']);
app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.

	when('/addProduct', {
		templateUrl : 'source/templates/temp_new_product.html',
		controller : 'addProductCtrl'
	}).

	when('/', {
		templateUrl : 'source/templates/temp_products_visualiza.html',
		controller : 'productsCtrl'
	}).

	when('/viewProduct', {
		templateUrl : 'source/templates/temp_steps_container.html',
		controller : 'productCtrl'
	}).

	otherwise({
		redirectTo : '/'
	});
} ]);