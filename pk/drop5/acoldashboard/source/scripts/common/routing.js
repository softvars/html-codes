app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.

	when('/addProduct', {
		templateUrl : 'source/templates/temp_new_product.html',
		controller : 'addProductCtrl'
	}).
    when('/editWidgets/:productId/step:currentStep', {
        templateUrl: 'source/templates/product_widgets.html',
        controller: 'addWidgetsForproductCtrl'
     
    }).
	when('/', {
		templateUrl : 'source/templates/temp_products_visualiza.html',
		controller : 'productsCtrl'
	}).
	when('/addWidgets', {
		templateUrl : 'source/templates/product_widgets.html',
		controller : 'addWidgetsForproductCtrl'
	}).
	otherwise({
		redirectTo : '/'
	});
} ]);