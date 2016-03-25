
(function(){
angular.module('dashboardApp').service("productService",productService);
productService.$inject=["$http", "$rootScope","queryService"];

function productService($http, $rootScope,queryService){
    var _self = this;
    _self.loadProductList = function(cbk){
         var config={method:'GET',url:'product'}
         queryService.query(config, 'product', {}, {})
        .then(function(data) {if(cbk){cbk(data);}
            return data;
           
        });
      
    };
    
    _self.deleteProduct = function(productId,cbk) {
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

     _self.copyProduct = function(product,mode,cbk) {
          $rootScope.startLoading();
        return $http({
                method: 'POST',
                data: angular.toJson(product),
                headers: {'Content-Type': 'application/json'},
                url: 'product/'+product.id+'/clone/'+mode
            }).then(function successCallback(response) {
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
  
     _self.updateProduct = function(product,cbk) {
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


    /*_self.doClearCache = function(){
        _self.productTemp = null;
    };

    _self.doCache = function(response, data) {
        _self.productTemp = data || (response && response.data && response.data[0]);
    };

    _self.getFromCache = function(productid, isFull, cbk) {
        var isAvail = false;
        if(productAPI.productTemp && productAPI.productTemp.id == productid && cbk) {
            cbk({data:[productAPI.productTemp]});
            isAvail = true;
        } 
        return isAvail; 
    };*/

  
   
};})();