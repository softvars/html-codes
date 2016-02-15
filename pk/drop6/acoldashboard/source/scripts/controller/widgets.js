app.controller("addWidgetsForproductCtrl", ["$scope", "$route", "$routeParams"  , "$uibModal","productService","widgetService", function($scope, $route, $routeParams, $uibModal, productService,widgetService) {
    console.log("current step:" + $routeParams.currentStep);
    console.log("current pid:" + $routeParams.productId);
    $scope.setCurrentStep = function(step){
        $scope.currentStep = step;
    };
    
    $scope.getCurrentStep = function(){
        return $scope.currentStep;
    };
    
    $scope.getSelectedData = function(isAdd){
        productService.getProduct($routeParams.productId, true, function(res){
            $scope.selectedData.data =  res.data.data[0];
            $scope.selectedData.currentStep =  $routeParams.currentStep;
             $scope.models.product_steps = [].concat($scope.getSelectedWidgets());
        })
    };
    
    var isAdd = location.href.indexOf("addWidgets") !== -1;
    $scope.isEnableNext=false;$scope.isEnableSave=true;
    
    $scope.getSelectedData(isAdd);
    
    $scope.getCategories = function(){
        widgetService.getCategoryList(function(res){
           $scope.categories = res && res.data && res.data.data ||[];
           $scope.getWidgets();
        })
    };
     $scope.widgetList = [];
     $scope.getWidgets = function(){
        
         for(var i = 0; i< $scope.categories.length-1;i++){
              var catId = $scope.categories[i].code;
             $scope.models.lists[catId] =[];
             widgetService.getWidgetList( catId,function(res){
                 var resWidget = res && res.data && res.data.data ||[];
                  for(var j=0;j< resWidget.length;j++){
                      var imgUrl = "source/images/"+resWidget[j].code+".JPG"
                      var wgtObj = {};
                      wgtObj.id = resWidget[j].code;
                      wgtObj.label = resWidget[j].name;
                      wgtObj.url = imgUrl;
                      wgtObj.type = "widget";
                      wgtObj.catId = resWidget[j].category.code;
                     $scope.models.lists[catId].push(wgtObj);
                    }
            })
         }
        
    };
    $scope.getCategories()
    /*  $scope.widgetImages=[
                        {name:"Nome e Cognome",img:"nome_cognome",catId:"A"},
                        {name:"Codice promozionale",img:"codice_promo",catId:"A"},
                        {name:"Codice fiscale ",img:"cod_fiscale",catId:"A"},
                        {name:"Email",img:"email",catId:"B"},
                        {name:"Cittadinanza",img:"city",catId:"B"},
                        
                ];
    $scope.createWidgetData = function(){
        var widgetImg = $scope.widgetList;
        var widgetCat= $scope.categories;
        for(var j=0;j<widgetCat.length;j++){
             var wCat = widgetCat[j];
            $scope.models.lists[wCat]=[];
            for (var i = 0; i < widgetImg.length; i++) {
                var widgetId = widgetImg[i].img;
                var categoryId = widgetCat[j]+"_"+widgetId;
                var imgUrl = "source/images/"+widgetId+".JPG"
               if(widgetImg[i].catId==wCat){
                $scope.models.lists[wCat].push({id:widgetId, type:"widget", catId:categoryId + i, 
                                                        label: widgetImg[i].name,url:imgUrl});
               }

            }
        }
    };
    $scope.createWidgetData();*/
  
   
    //$scope.selectedData.currentStep = $scope.getCurrentStep();
    
    
    $scope.doNextClick = function(currentStep){
        $scope.setCurrentStep(parseInt($scope.getCurrentStep())+1);
        $scope.proceedStep($scope.selectedData.data.id);
         $scope.isEnableNext =  $scope.isEnableNext;
    };
    
    $scope.doPreviousClick = function(currentStep){
         $scope.setCurrentStep(parseInt($scope.getCurrentStep())-1);
         $scope.proceedStep($scope.selectedData.data.id);
    };
    
    $scope.doSaveClick = function() {
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

    
    
    
    
}]);
  app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance,pdtId) {
      $scope.pdtId = pdtId;
    $scope.doClkPropertyConfirm = function (pdtId) {
      $uibModalInstance.close($scope.pdtId);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
