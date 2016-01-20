app.controller('addProductCtrl', function ($scope, $rootScope) {
    $scope.doConfirm = function(){
        var getElement =function(id){return angular.element(document.getElementById(id))};
        var prodCode=getElement('prodCode').val();
        var name=getElement('name').val();
        var descr=getElement('descr').val();
        var numberofSteps=getElement('numberofSteps').val();
        var templateCode=getElement('templateCode').val();
        var postObj = {"prodCode":prodCode,"name":name,"descr":descr,"numberofSteps":numberofSteps,"templateCode":templateCode}
        $scope.productCollection.push($scope.createDataJson(postObj));
        $scope.setCurrentStep(1);
        $scope.go('/addWidgets')
       
    };
});