app.factory('productService', ['$http', '$rootScope', function($http, $rootScope){
    var productAPI = {};
    
    productAPI.loadProductList = function(){
        return $http({
                method: 'GET',
                url: '/mock/productList.json'
            }).then(function successCallback(response) {
                var data = response.data;
                if(data) {
                    $rootScope.productCollection = angular.isArray(data) ? data : [data];
                    $rootScope.initDone = true;
                }
            });
    };
    
    productAPI.saveProductList = function(){
        return $http({
                method: 'POST',
                data: $rootScope.productCollectionAsJson,
                headers: {'Content-Type': 'application/json'},
                url: '/mock/productList.json'
            }).then(function successCallback(response) {
                console.log("response :" + response);
            });
    };
    
    return productAPI;
}]);