app.controller('addProductCtrl', function ($scope, $rootScope) {
    $scope.getElement =function(id){return angular.element(document.getElementById(id))};
    $scope.enableConfirm = false;
    $scope.doConfirm = function(){
        
        var prodCode=$scope.getElement('prodCode').val();
        var name=$scope.getElement('name').val();
        var descr=$scope.getElement('descr').val();
        var numSteps=$scope.getElement('numberofSteps').val();
        var templateCode=$scope.getElement('templateCode').val();
        var postObj = {"prodCode":prodCode,"name":name,"descr":descr,"numSteps":numSteps,"templateCode":templateCode}
        $scope.productCollection.push($scope.createDataJson(postObj));
        $scope.setCurrentStep(1);
        $scope.proceedStep()
       
    };
    
});