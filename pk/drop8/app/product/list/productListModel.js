(function(){
angular.module('dashboardApp').factory("productFactory",productFactory);
productFactory.$inject=['$http', '$rootScope','productService'];
 function productFactory($http, $rootScope,productService) {
      var productAPI = {};
    productAPI.productTemp = null;
    productAPI.loadProductList = function(){
        var responseCbk =function(response){
            $rootScope.productCollection = response.data && response.data.data || response.data;
            productAPI = response;
        };
        productService.loadProductList(responseCbk);
   
    };
    
  productAPI.deleteProduct = function(productId,cbk) {
       var responseObj = productService.deleteProduct(productId,cbk);
        productAPI.responseObj = responseObj;
    };

     productAPI.copyProduct = function(product,mode,cbk) {
         var responseObj = productService.copyProduct(product,mode,cbk);
        productAPI.responseObj = responseObj;
    };
  
     productAPI.updateProduct = function(product,cbk) {
        var responseObj = productService.updateProduct(product,cbk);
        productAPI.responseObj = responseObj;
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

  
    return productAPI;
};

})();

