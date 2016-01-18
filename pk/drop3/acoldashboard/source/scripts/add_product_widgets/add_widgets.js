app.controller("addWidgetsForproductCtrl", function($scope) {

    $scope.models = {
        selected: null,
        product_allowed_types: ["widget"],
        product_steps: [],
        lists: {"A": [], "B": []},
        wlist:[]
    };
    
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({id:"A"+i, type:"widget", catId:"WA" + i, label: "Widget A" + i});
        $scope.models.lists.B.push({id:"B"+i, type:"widget", catId:"WB" + i, label: "Widget B" + i});
    }

    $scope.selectedData ={};
    if(location.href.indexOf("addWidgets") !=-1) {
        $scope.selectedData=$scope.getSelectedData(true);
    } else {
        $scope.selectedData = $scope.getSelectedData();
    }
   
  //  $scope.selectedData.currentStep = $scope.getCurrentStep()+1;
    //$scope.setCurrentStep($scope.selectedData.currentStep);
    
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
    if(location.href.indexOf("addWidgets") !=-1){
    $scope.selectedData=$scope.getSelectedData(true);
     }
    else{
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
    
    //$scope.setCurrentStep($scope.selectedData.currentStep);
});
