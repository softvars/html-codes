app.factory('productService', ['$http', '$rootScope', function($http, $rootScope){
    var productAPI = {};
    
    productAPI.loadProductList = function(){
        return $http({
                method: 'GET',
                url: '/api/product'
            }).then(function successCallback(response) {
                var data = response.data;
                if(data) {
                    $rootScope.productCollection = angular.isArray(data) ? data : [data];
                    $rootScope.initDone = true;
                }
            });
    };
    
    productAPI.addProduct = function(product) {
        return $http({
                method: 'POST',
                data: angular.toJson(product),
                headers: {'Content-Type': 'application/json', cust_method_name:'testName'},
                url: '/api/product'
            }).then(function successCallback(response) {
                console.log("response :" + response);
            });
    };

    productAPI.saveProductList = function(){
        return $http({
                method: 'POST',
                data: $rootScope.productCollectionAsJson,
                headers: {'Content-Type': 'application/json'},
                 url: '/api/product'
            }).then(function successCallback(response) {
                console.log("response :" + response);
            });
    };
    
    return productAPI;
}]);