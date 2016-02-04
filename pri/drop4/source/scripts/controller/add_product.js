app.controller('addProductCtrl', function ($scope, $rootScope, productService) {
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
        $scope.productCollection.push(json);
        $scope.setCurrentStep(1);
        $scope.proceedStep()
        productService.addProduct(json);
    };
});