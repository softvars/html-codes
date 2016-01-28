app.controller("addWidgetsForproductCtrl", function($scope, $uibModal) {
    
    var isAdd = location.href.indexOf("addWidgets") !== -1;
    $scope.isEnableNext=false;$scope.isEnableSave=true;
    $scope.selectedData= $scope.getSelectedData(isAdd);
    $scope.selectedData.currentStep = $scope.getCurrentStep();
        
    $scope.doNextClick = function(currentStep){
        $scope.setCurrentStep(parseInt($scope.getCurrentStep())+1);
        $scope.proceedStep($scope.selectedData.data.id);
         $scope.isEnableNext =  $scope.isEnableNext;
    };
    
    $scope.doPreviousClick = function(currentStep){
         $scope.setCurrentStep(parseInt($scope.getCurrentStep())-1);
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
        if($scope.selectedData) {
            var currentStep = parseInt($scope.selectedData.currentStep);
            if(!(currentStep)) {
                $scope.go("/");
            }
            var widgetsForStep = ($scope.selectedData.data && $scope.selectedData.data["widgetsForStep"]) || [] ;
            if(widgetsForStep) {
                selectedwidgets =  widgetsForStep[currentStep];
            }
        }
        return (angular.isArray(selectedwidgets) ? selectedwidgets : []);
    };
     
    $scope.setSelectedWidgets = function(){
        var idx = parseInt($scope.selectedData.idx) ;
        if(idx >= 0) {
            var widgetsForStep =  $scope.productCollection[idx]["widgetsForStep"];
            if(!widgetsForStep) {
                $scope.productCollection[idx].widgetsForStep = {};
            }
            $scope.productCollection[idx].widgetsForStep[$scope.selectedData.currentStep] = $scope.models.product_steps;
        }
    };
        
    $scope.models.product_steps = [].concat($scope.getSelectedWidgets());
    
/*    $scope.containsObject = function(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (angular.equals(list[i], obj)) {
                return true;
            }
        }
        return false;
    };*/
        
    $scope.dropCallback = function(event, index, item, external, type, allowedTypes) {
        /*if($scope.models.product_steps.length){
            if($scope.containsObject(item, $scope.models.product_steps)){
                return false;
            }
        }*/
        return item;
    };
    $scope.isWidgetAdded = function(item) {
        if(item) {
            var list = $scope.models.product_steps;
            if(list && list.length){
                for (i = 0; i < list.length; i++) {
                    if (list[i] && list[i].id === item.id) {
                        item["isDisabled"] = true;
                        return true;
                    } else {
                        item["isDisabled"] = false;
                    }
                }
            }
        }
        return false;
    };
    
  $scope.animationsEnabled = true;
  $scope.isDone = false;
  $scope.pdtId = '';
  $scope.addProductProperty = function (widget) {
    $scope.pdtId =event.currentTarget.id;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'source/templates/product_property.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        pdtId: function () {
          return $scope.pdtId;
        }
      }
    });

    modalInstance.result.then(function (pdtId) {
       widget.isDone = true;
    }, function () {
     console.log("close");
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

    
});
  app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance,pdtId) {
      $scope.pdtId = pdtId;
    $scope.doClkPropertyConfirm = function (pdtId) {
      $uibModalInstance.close($scope.pdtId);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
    });
