app.factory('productService', ['$http', '$rootScope', function($http, $rootScope){
    var productAPI = {};
    
    productAPI.loadProductList = function(){
        return $http({
                method: 'GET',
                url: '/api/product'
            }).then(function successCallback(response) {
                var data = response.data && response.data.data||[];
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
                headers: {'Content-Type': 'application/json'},
                url: '/api/product'
            }).then(function successCallback(response) {
                console.log("response :" + response);
            });
    };
    
     productAPI.deleteProduct = function(productId) {
        return $http({
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                url: '/api/product/'+productId
            }).then(function successCallback(response) {
                console.log("response :" + response);
            });
    };
    
     productAPI.copyProduct = function(product,mode) {
        return $http({
                method: 'POST',
                data: angular.toJson(product),
                headers: {'Content-Type': 'application/json'},
                url: '/api/product/'+product.id+'/clone/'+mode
            }).then(function successCallback(response) {
                console.log("response :" + response);
            });
    };
    
     productAPI.getProduct = function(product,isFull) {
        return $http({
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                url: '/product/'+product.id+'?full='+(isFull ||false)
            }).then(function successCallback(response) {
                console.log("response :" + response);
            });
    };

   /* productAPI.saveProductList = function(){
        return $http({
                method: 'PUT',
                data: $rootScope.productCollectionAsJson,
                headers: {'Content-Type': 'application/json'},
                 url: '/api/product'
            }).then(function successCallback(response) {
                console.log("response :" + response);
            });
    };
    */
    return productAPI;
}]);