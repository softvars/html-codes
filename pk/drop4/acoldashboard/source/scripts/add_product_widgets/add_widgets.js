app.controller("addWidgetsForproductCtrl", function($scope, $rootScope) {
    if (location.href.indexOf("addWidgets") !== -1){
        $scope.selectedData=$scope.getSelectedData(true);
    }
    else {
        $scope.selectedData = $scope.getSelectedData();
    }
    $scope.selectedData.currentStep = $scope.getCurrentStep();
    $scope.doNextClick = function(currentStep){
        $scope.setCurrentStep($scope.getCurrentStep()+1);
        $scope.proceedStep($scope.selectedData.data.id);
    };
     $scope.doPreviousClick = function(currentStep){
         $scope.setCurrentStep($scope.getCurrentStep()-1);
         $scope.proceedStep($scope.selectedData.data.id);
    
    };
    $scope.doSaveClick = function(){$scope.setSelectedWidgets();}
    $scope.doCancel = function(){}
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
    
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
    
    $scope.$watch('productCollection', function(productCollection) {
        $scope.productCollectionAsJson = angular.toJson(productCollection, true);
    }, true);
    
    
    $scope.dropCallback = function(event, index, item, external, type, allowedTypes) {
        $scope.logListEvent('dropped at', event, index, external, type);
        if($scope.models.product_steps.length){
            if($scope.containsObject(item, $scope.models.product_steps)){
                return false;
            }
        }
        
        return item;
    };
    
    $scope.logEvent = function(message, event) {
        console.log(message, '(triggered by the following', event.type, 'event)');
        console.log(event);
    };

    $scope.logListEvent = function(action, event, index, external, type) {
        var message = external ? 'External ' : '';
        message += type + ' element is ' + action + ' position ' + index;
        $scope.logEvent(message, event);
    };
});
