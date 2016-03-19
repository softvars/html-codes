app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.
    when('/', {
		templateUrl : 'acol/app/templates/productlist_view.html',
		controller : 'productsCtrl'
	}).
	when('/addProduct', {
		templateUrl : 'acol/app/templates/add_new_product.html',
		controller : 'addProductCtrl'
	}).
    when('/editWidgets/:productId/step/:currentStep', {
        templateUrl: 'acol/app/templates/product_widgets.html',
        controller: 'addWidgetsForproductCtrl'
    }).
	when('/addWidgets/:productId/step/:currentStep', {
		templateUrl : 'acol/app/templates/product_widgets.html',
		controller : 'addWidgetsForproductCtrl'
	}).
      when('/viewWidgets/:productId/step/:currentStep', {
        templateUrl: 'acol/app/templates/product_widgets.html',
        controller: 'addWidgetsForproductCtrl'
    }).
	when('/ckeditor', {
        templateUrl: 'acol/app/templates/ckeditorTemplate.html',
        controller: 'htmlEditorController'
    }).
    when('/tinemceeditor', {
        templateUrl: 'acol/app/templates/tinymceeditorTemplate.html',
        controller: 'htmlEditorController'
    }).
	otherwise({
		redirectTo : '/'
	});
} ]);