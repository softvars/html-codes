app.factory('productService', ['$http', '$rootScope', function($http, $rootScope){
    var productAPI = {};
    productAPI.productTemp = null;
    productAPI.loadProductList = function(){
          $rootScope.startLoading();
        return $http({
                method: 'GET',
                url: 'product'
            }).then(function successCallback(response) {
              $rootScope.stopLoading();
                //productAPI.doCache(response);
             //   productAPI.doClearCache();
                var data = response.data && response.data.data||[];
                if(data) {
                    $rootScope.productCollection = angular.isArray(data) ? data : [data];
                    $rootScope.initDone = true;
                }
            },function errorCallback(response){
                console.log(response);
             $rootScope.stopLoading();
            });
    };
    
    productAPI.addProduct = function(product, cbk) {
         $rootScope.startLoading();
        return $http({
                method: 'POST',
                data: angular.toJson(product),
                headers: {'Content-Type': 'application/json'},
                url: 'product'
            }).then(function successCallback(response) {
             //   productAPI.doCache(response);
            $rootScope.stopLoading();
                if(cbk) { cbk(response)};
                console.log("response :" + response);
            },function errorCallback(response){
                console.log(response);
             $rootScope.stopLoading();
            });
    };

    productAPI.updateProductStep = function(productid, step, widgets, cbk) {
         $rootScope.startLoading();
        return $http({
                method: 'POST',
            data: angular.toJson({number: step,name:"step"+step, widgets: widgets}),
                headers: {'Content-Type': 'application/json'},
                url: 'product/' + productid + '/step/'+step
            }).then(function successCallback(response) {
            //    productAPI.doClearCache();
                $rootScope.stopLoading();
                if(cbk) { cbk(response)};
                console.log("response :" + response);
            },function errorCallback(response){
                console.log(response);
             $rootScope.stopLoading();
            });
    };

     productAPI.deleteProduct = function(productId,cbk) {
          $rootScope.startLoading();
        return $http({
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                url: 'product/'+productId
            }).then(function successCallback(response) {
             $rootScope.stopLoading();
               if(cbk) { cbk(response)};
                console.log("response :" + response);
            },function errorCallback(response){
                console.log(response);
             $rootScope.stopLoading();
            });
    };

     productAPI.copyProduct = function(product,mode,cbk) {
          $rootScope.startLoading();
        return $http({
                method: 'POST',
                data: angular.toJson(product),
                headers: {'Content-Type': 'application/json'},
                url: 'product/'+product.id+'/clone/'+mode
            }).then(function successCallback(response) {
            //    productAPI.doCache(response);
             $rootScope.stopLoading();
                if(cbk) {
                    cbk(response);
                }
                console.log("response :" + response);
            },function errorCallback(response){
                console.log(response);
             $rootScope.stopLoading();
            });
    };

    productAPI.getProduct = function(productid, isFull, cbk) {
         $rootScope.startLoading();
        if(!productAPI.getFromCache(productid, isFull, cbk)) {
            return $http({
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                url: 'product/'+productid+'?full='+(isFull || true)
            }).then(function successCallback(response) {
              //  productAPI.doCache(response);
                 $rootScope.stopLoading();
                if(cbk) {
                    cbk(response);
                }
                console.log("response :" + response);
            },function errorCallback(response){
                console.log(response);
             $rootScope.stopLoading();
            });
        }
    };
    
     productAPI.updateProduct = function(product,cbk) {
          $rootScope.startLoading();
        return $http({
                method: 'POST',
                data: angular.toJson(product),
                headers: {'Content-Type': 'application/json'},
                url: 'product/' + product.id
            }).then(function successCallback(response) {
               // productAPI.doClearCache();
             $rootScope.stopLoading();
                if(cbk) { cbk(response)};
                console.log("response :" + response);
            },function errorCallback(response){
                console.log(response);
             $rootScope.stopLoading();
            });
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