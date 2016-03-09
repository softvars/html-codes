app.controller("addWidgetsForproductCtrl", ["$scope", "$route", "$routeParams", "$uibModal", "util", "productService","widgetService", function($scope, $route, $routeParams, $uibModal, util, productService,widgetService) {
    $scope.isView = util.hasPath("viewWidgets");
    $scope.oldData =[]
    if(!$scope.isView){
    $(".side-bar-view").show();}
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
            if($scope.selectedData.data && $scope.selectedData.data.id){
        widgetService.getStepWidgets($scope.selectedData.data.id,function(res){
            console.log(" res.data ",res.data);
            var widgets = (res.data&& res.data.data && res.data.data[0] && res.data.data[0].widgets && res.data.data[0].widgets) || [] ;
            console.log("widgets ",widgets);
            $scope.oldData = widgets;
            /*if(widgets) {
                selectedwidgets =  widgets[$scope.selectedData.currentStep];
            }*/
            console.log('selectedwidgets ',widgets);
            selectedwidgets = (angular.isArray(widgets)) ? widgets : []
            console.log("#####before",$scope.models.product_steps);
            $scope.models.product_steps = [].concat(widgets);
              },currentStep);
            }
        }

    };

    $scope.setSelectedWidgets = function(){
        var idx = parseInt($scope.selectedData.currentStep) ;
        if(idx >= 0) {
            var widgets =  $scope.selectedData.data["widgets"];
            if(!widgets) {
                $scope.selectedData.data.widgets = {};
            }
            $scope.models.product_steps = $scope.createStepJson($scope.selectedData.data.id,$scope.models.product_steps);
            $scope.selectedData.data.widgets[$scope.selectedData.currentStep] = $scope.models.product_steps;
            productService.updateProductStep($scope.selectedData.data.id, $scope.selectedData.currentStep, $scope.models.product_steps, function(res){
                //res.data[0];
            })
        }
    };
    $scope.createStepJson =  function(id, widgets){
        var resWidgets = [];
        for(i=0; i<widgets.length; i++){
            var widget = widgets[i];
            widgetInfo = {
                code : widget.code,
                bundleCode: null,
                position: (i + 1),
                configurations: widget.configurations,
                components: widget.components,
                properties: widget.properties,
                name: widget.name,
                description: widget.description
               
            };
            resWidgets.push(widgetInfo);
        }
        return resWidgets;

    };
    $scope.getSelectedData = function(isAdd,cbk){
        productService.getProduct($routeParams.productId, true, function(res){
            $scope.selectedData = {};
            $scope.selectedData.data =  isAdd && res.data && res.data.data && res.data.data[0] || res.data && res.data.data &&            res.data.data[0] ||res.data[0] ||[];
            $scope.selectedData.currentStep =  $scope.getCurrentStep();
            $scope.getSelectedWidgets();
            console.log( $scope.models.product_steps);
            if(cbk)cbk();
        })
    };
    
    var isAdd = location.href.indexOf("addWidgets") !== -1;
    $scope.isEnableNext=false;$scope.isEnableSave=true;
    
    $scope.getSelectedData(isAdd);
    
    $scope.doNextClick = function(currentStep){
      if(!angular.equals($scope.oldData,$scope.models.product_steps)){
       if(confirm("Do you want to save the changes you made in the step?")){
          $scope.doSaveClick();
           return;
          }
          else{
        $scope.setCurrentStep(parseInt($scope.getCurrentStep())+1);                                    
        }
      }
        else{
        $scope.setCurrentStep(parseInt($scope.getCurrentStep())+1);                                    
        }
      
      
        //$scope.proceedStep($scope.selectedData.data.id);
        var cbk = function(){
            var  path = util.hasPath("viewWidgets")  && "/viewWidgets/" || util.hasPath("editWidgets") && "/editWidgets/"||util.hasPath("addWidgets") &&"/addWidgets/" ||'';
          
            util.go(path + $scope.selectedData.data.id +"/step/" + $scope.getCurrentStep()); 
         $scope.isEnableNext =  $scope.isEnableNext;}
        if($scope.selectedData && $scope.selectedData.data){
                cbk();
        }
        else{
                $scope.getSelectedData(isAdd,cbk);
        }
         
    };
    
    $scope.doPreviousClick = function(currentStep){
        if(!angular.equals($scope.oldData,$scope.models.product_steps)){
       if(confirm("Do you want to save the changes you made in the step?")){
          $scope.doSaveClick();
           return;
       }  else{
        $scope.setCurrentStep(parseInt($scope.getCurrentStep())-1);                                    
        }
      }
        else{
        $scope.setCurrentStep(parseInt($scope.getCurrentStep())-1);                                    
        }
      
       var cbk = function(){
             var  path = util.hasPath("viewWidgets")  && "/viewWidgets/" || util.hasPath("editWidgets") && "/editWidgets/"||util.hasPath("addWidgets") &&"/addWidgets/" ||'';
           
           util.go(path + $scope.selectedData.data.id +"/step/" + $scope.getCurrentStep()); }
        if($scope.selectedData && $scope.selectedData.data){
                cbk();
        }
        else{
                $scope.getSelectedData(isAdd,cbk);
        }
         //$scope.proceedStep($scope.selectedData.data.id);
    };
    
    $scope.doSaveClick = function() {
        $scope.setSelectedWidgets();
        var currentStep = parseInt($scope.getCurrentStep());
        if($scope.selectedData.data.numSteps > currentStep){
            $scope.setCurrentStep(currentStep + 1);
            //$scope.proceedStep($scope.selectedData.data.id); 
               var  path = util.hasPath("viewWidgets")  && "/viewWidgets/" || util.hasPath("editWidgets") && "/editWidgets/"||util.hasPath("addWidgets") &&"/addWidgets/" ||'';
            util.go(path + $scope.selectedData.data.id +"/step/" + $scope.getCurrentStep()); 
            $scope.isEnableNext=true;
        }
        else{
            $scope.isEnableNext=false;
            $scope.isEnableSave=false;
            util.go('/');
        }
    };
    
    $scope.doCancel = function(){
        util.go('/');
    };   
    

    $scope.dropCallback = function(event, index, item, external, type, allowedTypes) {
        /*if($scope.models.product_steps.length){
            if($scope.containsObject(item, $scope.models.product_steps)){
                return false;
            }
        }*/
        return item;
    };
  


  $scope.animationsEnabled = true;
  $scope.isDone = false;
  $scope.pdtId = '';
  $scope.addProductProperty = function (widget) {
    $scope.pdtId =event.currentTarget.id;
      var sucCbk= function(){};
      var errCbk= function(){};
    $scope.createModel('product_property.html','addWidgetsForproductCtrl',sucCbk,errCbk,{product : $scope.product});
  
                                        
}  
    $scope.cancel = function(){
    $scope.alertInstance.dismiss('cancel');
 };
  $scope.ok = function (elt) {
        $scope.alertInstance.close($scope.pdtId); 

  };   

}]);
  /*app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance,pdtId) {
      $scope.pdtId = pdtId;
    $scope.doClkPropertyConfirm = function (pdtId) {
      $uibModalInstance.close($scope.pdtId);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
*/