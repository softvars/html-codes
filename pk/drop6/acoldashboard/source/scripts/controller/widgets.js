app.controller("addWidgetsForproductCtrl", ["$scope", "$route", "$routeParams", "$uibModal", "util", "productService","widgetService", function($scope, $route, $routeParams, $uibModal, util, productService,widgetService) {
    $scope.isView = util.hasPath("viewWidgets");
    console.log("current step:" + $routeParams.currentStep);
    console.log("current pid:" + $routeParams.productId);
    $scope.setCurrentStep = function(step){
        $scope.currentStep = step;
    };
    
    $scope.getCurrentStep = function(){
        return $scope.currentStep;
    };
    $scope.setCurrentStep($routeParams.currentStep);
    $scope.getSelectedWidgets = function(){
        var selectedwidgets = [];
        if($scope.selectedData) {
            var currentStep = parseInt($scope.selectedData.currentStep);
            if(!(currentStep)) {
                util.go("/");
            }
            var widgets = ($scope.selectedData.data && $scope.selectedData.data["widgets"]) || [] ;
            if(widgets) {
                selectedwidgets =  widgets[currentStep];
            }
        }
        return (angular.isArray(selectedwidgets) ? selectedwidgets : []);
    };
     
    $scope.setSelectedWidgets = function(){
        var idx = parseInt($scope.selectedData.currentStep) ;
        if(idx >= 0) {
            var widgets =  $scope.selectedData.data["widgets"];
            if(!widgets) {
                $scope.selectedData.data.widgets = {};
            }
            $scope.selectedData.data.widgets[$scope.selectedData.currentStep] = $scope.models.product_steps;
            productService.updateProductStep($scope.selectedData.data.id, $scope.selectedData.currentStep, $scope.models.product_steps, function(res){
                //res.data[0];
            })
        }
    };
    $scope.getSelectedData = function(isAdd){
        productService.getProduct($routeParams.productId, true, function(res){
            $scope.selectedData = {};
            $scope.selectedData.data =  isAdd && res.data && res.data.data[0] || res.data[0];
            $scope.selectedData.currentStep =  $scope.getCurrentStep();
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
         for(var i = 0; i< $scope.categories.length;i++){
             var catList = $scope.categories[i];
             var catId =catList.code;
             $scope.models.lists[catId] =new Array();
             
             widgetService.getWidgetList(catId,function(res){
                 var resWidget = res && res.data && res.data.data ||[];
                 
                  for(var j=0;j< resWidget.length;j++){
                      var imgUrl = "source/images/"+resWidget[j].code+".JPG"
                      var id = resWidget[j].code;
                      var label = resWidget[j].name;
                      var url = imgUrl;
                      var catgId = resWidget[j].category.code;
                   
                     $scope.models.lists[catgId].push({id:id, type:"widget", catId:catgId, 
                                                        label: label,url:url});
                    
                }
                 
            });
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
        //$scope.proceedStep($scope.selectedData.data.id);
         util.go("/editWidgets/" + $scope.selectedData.data.id +"/step/" + $scope.getCurrentStep()); 
         $scope.isEnableNext =  $scope.isEnableNext;
    };
    
    $scope.doPreviousClick = function(currentStep){
         $scope.setCurrentStep(parseInt($scope.getCurrentStep())-1);
         util.go("/editWidgets/" + $scope.selectedData.data.id +"/step/" + $scope.getCurrentStep()); 
         //$scope.proceedStep($scope.selectedData.data.id);
    };
    
    $scope.doSaveClick = function() {
        $scope.setSelectedWidgets();
        var currentStep = parseInt($scope.getCurrentStep());
        if($scope.selectedData.data.numSteps > currentStep){
            $scope.setCurrentStep(currentStep + 1);
            //$scope.proceedStep($scope.selectedData.data.id); 
            util.go("/editWidgets/" + $scope.selectedData.data.id +"/step/" + $scope.getCurrentStep()); 
            $scope.isEnableNext=true;
        }
        else{
            $scope.isEnableNext=false;
            $scope.isEnableSave=false;
            util.go('/');
        }
    };
    
    $scope.doCancel = function(){
        //$scope.models.product_steps =[];
        //$scope.setSelectedWidgets();
        util.go('/');
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
