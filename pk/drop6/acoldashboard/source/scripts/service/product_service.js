app.factory('productService', ['$http', '$rootScope', function($http, $rootScope){
    var productAPI = {};
    productAPI.productTemp = null;
    productAPI.loadProductList = function(){
        return $http({
                method: 'GET',
                url: '/product'
            }).then(function successCallback(response) {
                //productAPI.doCache(response);
                productAPI.doClearCache();
                var data = response.data && response.data.data||[];
                if(data) {
                    $rootScope.productCollection = angular.isArray(data) ? data : [data];
                    $rootScope.initDone = true;
                }
            });
    };
    
    productAPI.addProduct = function(product, cbk) {
        return $http({
                method: 'POST',
                data: angular.toJson(product),
                headers: {'Content-Type': 'application/json'},
                url: '/product'
            }).then(function successCallback(response) {
                productAPI.doCache(response);
                if(cbk) { cbk(response)};
                console.log("response :" + response);
            });
    };

    productAPI.updateProductStep = function(productid, step, widgets, cbk) {
        return $http({
                method: 'POST',
                data: angular.toJson({step: step, widgets: widgets}),
                headers: {'Content-Type': 'application/json'},
                url: '/product/' + productid + '/step' 
            }).then(function successCallback(response) {
                productAPI.doClearCache();
                if(cbk) { cbk(response)};
                console.log("response :" + response);
            });
    };
    
     productAPI.deleteProduct = function(productId,cbk) {
        return $http({
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                url: '/product/'+productId
            }).then(function successCallback(response) {
               if(cbk) { cbk(response)};
                console.log("response :" + response);
            });
    };
    
     productAPI.copyProduct = function(productId,mode,cbk) {
        return $http({
                method: 'POST',
                data: angular.toJson(product),
                headers: {'Content-Type': 'application/json'},
                url: '/product/'+product.id+'/clone/'+mode
            }).then(function successCallback(response) {
                productAPI.doCache(response);
                if(cbk) {
                    cbk(response);
                }
                console.log("response :" + response);
            });
    };
    
    productAPI.getProduct = function(productid, isFull, cbk) {
        if(!productAPI.getFromCache(productid, isFull, cbk)) {
            return $http({
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                url: '/product/'+productid+'?full='+(isFull || false)
            }).then(function successCallback(response) {
                productAPI.doCache(response);
                if(cbk) {
                    cbk(response);
                }
                console.log("response :" + response);
            });
        }
    };
    
    productAPI.doClearCache = function(){
        productAPI.productTemp = null;
    };
    
    productAPI.doCache = function(response, data) {
        productAPI.productTemp = data || (response && response.data && response.data[0]);
    };
    
    productAPI.getFromCache = function(productid, isFull, cbk) {
        var isAvail = false;
        if(productAPI.productTemp && productAPI.productTemp.id == productid && cbk) {
            cbk({data:[productAPI.productTemp]});
            isAvail = true;
        } 
        return isAvail; 
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