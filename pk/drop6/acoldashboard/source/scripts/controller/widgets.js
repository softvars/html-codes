app.controller("addWidgetsForproductCtrl", function($scope, $rootScope) {
    
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
    
    $scope.$watch('productCollection', function(productCollection) {
        $scope.productCollectionAsJson = angular.toJson(productCollection, true);
    }, true);
    
    var isAdd = location.href.indexOf("addWidgets") !== -1;
    $scope.isEnableNext=false;$scope.isEnableSave=true;
    $scope.selectedData= $scope.getSelectedData(isAdd);
    $scope.selectedData.currentStep = $scope.getCurrentStep();
        
    $scope.doNextClick = function(currentStep){
        $scope.setCurrentStep($scope.getCurrentStep()+1);
        $scope.proceedStep($scope.selectedData.data.id);
         $scope.isEnableNext =  $scope.isEnableNext 
    };
    
    $scope.doPreviousClick = function(currentStep){
         $scope.setCurrentStep($scope.getCurrentStep()-1);
         $scope.proceedStep($scope.selectedData.data.id);
    
    };
    
    $scope.doSaveClick = function(){
        $scope.setSelectedWidgets();
      
        if($scope.selectedData.data.numSteps>$scope.getCurrentStep()){
            $scope.setCurrentStep($scope.getCurrentStep()+1);
            $scope.proceedStep($scope.selectedData.data.id); 
            $scope.isEnableNext=true;
        }
        else{
            $scope.isEnableNext=false;
            $scope.isEnableSave=false;
            $scope.go('/');
        }
        
       
    };
    
    $scope.doCancel = function(){
        $scope.models.product_steps =[];
        $scope.setSelectedWidgets();
    };
    
    $scope.getSelectedWidgets = function(){
        var selectedwidgets = [];
        var widgetsForStep = $scope.selectedData.data["widgetsForStep"];
        if(widgetsForStep) {
            selectedwidgets =  widgetsForStep[$scope.selectedData.currentStep];
        }
        return (angular.isArray(selectedwidgets) ? selectedwidgets : []);
    };
    
    $scope.setSelectedWidgets = function(){
        var widgetsForStep =  $scope.productCollection[$scope.selectedData.idx]["widgetsForStep"];
        if(!widgetsForStep) {
            $scope.productCollection[$scope.selectedData.idx].widgetsForStep = {};
        }
        $scope.productCollection[$scope.selectedData.idx].widgetsForStep[$scope.selectedData.currentStep] = $scope.models.product_steps;
    };
        
    $scope.models.product_steps = $scope.getSelectedWidgets();
    
    $scope.containsObject = function(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (angular.equals(list[i], obj)) {
                return true;
            }
        }
        return false;
    };
        
    $scope.dropCallback = function(event, index, item, external, type, allowedTypes) {
        if($scope.models.product_steps.length){
            if($scope.containsObject(item, $scope.models.product_steps)){
                return false;
            }
        }
        
        return item;
    };
    
   
});
