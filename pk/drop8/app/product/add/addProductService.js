/*app.service('addProductService', ['$http', '$rootScope', function($http, $rootScope){
    var _self = this;
   
    _self.addProduct = function(product, cbk) {
         $rootScope.startLoading();
        return $http({
                method: 'POST',
                data: angular.toJson(product),
                headers: {'Content-Type': 'application/json'},
                url: 'product'
            }).then(function successCallback(response) {
                $rootScope.stopLoading();
                if(cbk) { cbk(response)};
                console.log("response :" + response);
            },function errorCallback(response){
                console.log(response);
             $rootScope.stopLoading();
            });
    };

}]);*/