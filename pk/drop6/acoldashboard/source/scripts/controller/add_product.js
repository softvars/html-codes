app.controller('addProductCtrl', ["$scope", "$rootScope", "util","productService", function ($scope, $rootScope, util, productService) {
    //$scope.getElement =function(id){return angular.element(document.getElementById(id))};
    $scope.enableConfirm = false;
    $scope.product = {};
    $scope.doConfirm = function(product){
        var postObj = {
            "prodCode"  :product.code,
            "name"      :product.name,
            "descr"     :product.descr,
            "numSteps"  :product.step_count,
            "templateCode":product.template_code};
        var json = $scope.createDataJson(postObj);
        productService.addProduct(json, function(res) {
            var resData = res && res.data || {};
            var pid = resData && resData.data ? resData.data.id : "0";
            console.log("pid:" + pid);
            console.log("res.data:" + res.data);
            util.go("/addWidgets/"+ pid +"/step/1");
        });
        //$scope.productCollection.push(json);//
        //$scope.setCurrentStep(1);//
        //$scope.proceedStep();//
    };
}]);