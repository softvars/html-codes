app.run(['$rootScope', '$http', 'productService', function ($rootScope, $http, productService) {
    $rootScope.productCollection = [];
    $rootScope.initDone = false;
    productService.loadProductList();
    
   /* $rootScope.$watch('productCollection', function(productCollection) {
        $rootScope.productCollectionAsJson = angular.toJson(productCollection, true);
        if($rootScope.initDone) {
            productService.loadProductList();
        }
    }, true);
*/
    $rootScope.currentStep=0;
    $rootScope.selectedData ={};
    $rootScope.models = {
        selected: null,
        product_allowed_types: ["widget"],
        product_steps: [],
        lists: {}       
    };
    
    /*Mock widget creation [needs to updated the model based on the real widget data]*/
    $rootScope.categories=["A","B"] 
    $rootScope.widgetImages=[
                        {name:"Nome e Cognome",img:"nome_cognome",catId:"A"},
                        {name:"Codice promozionale",img:"codice_promo",catId:"A"},
                        {name:"Codice fiscale ",img:"cod_fiscale",catId:"A"},
                        {name:"Email",img:"email",catId:"B"},
                        {name:"Cittadinanza",img:"city",catId:"B"},
                        
                ];
    $rootScope.createWidgetData = function(){
        var widgetImg = $rootScope.widgetImages;
        var widgetCat= $rootScope.categories;
        for(var j=0;j<widgetCat.length;j++){
             var wCat = widgetCat[j];
            $rootScope.models.lists[wCat]=[];
            for (var i = 0; i < widgetImg.length; i++) {
                var widgetId = widgetImg[i].img;
                var categoryId = widgetCat[j]+"_"+widgetId;
                var imgUrl = "source/images/"+widgetId+".JPG"
               if(widgetImg[i].catId==wCat){
                $rootScope.models.lists[wCat].push({id:widgetId, type:"widget", catId:categoryId + i, 
                                                        label: widgetImg[i].name,url:imgUrl});
               }

            }
        }
    };
    $rootScope.createWidgetData();
    $rootScope.createDataJson = function(obj){
        var index = $rootScope.productCollection.length-1;
        var selData = $rootScope.productCollection[index];
    
        var dataObj={};
        dataObj.id =obj.id || ((selData && selData.id) && (selData.id+1)) || 1 ;
        dataObj.prodCode = obj.prodCode || '';
        dataObj.name=obj.name||'';
        dataObj.version=obj.version||'';
        dataObj.descr = obj.descr ||'';
        dataObj.favorite = obj.favorite ||'';
        dataObj.numSteps = obj.numSteps ||'';
        dataObj.templateCode =obj.templateCode ||'';
        dataObj.createUser =obj.createUser||'';
        dataObj.createDate =obj.createDate ||'';
        dataObj.updateDate = obj.updateDate ||'';
        dataObj.updateUser =obj.updateUser ||'';
        dataObj.properties = obj.properties||[];
        dataObj.releases =obj.releases||[];
        dataObj.steps = obj.steps ||'';
        return dataObj;
    };
   

    $rootScope.getSelectedData = function(isNew){
        var prevSelect= angular.element(document.getElementsByClassName("stSelected"));
          if(prevSelect.length == 0 && !isNew &&  $rootScope.selectedData){
              return  $rootScope.selectedData;
          }
        var index = prevSelect.attr("idx");
        var obj = {};
          if(isNew){
              index = $rootScope.productCollection.length-1;
              
          }
          obj={'idx':index,'data':$rootScope.productCollection[index]}
        if (index && index !== -1) {
            $rootScope.selectedData =obj;
        return obj;}else{return false;}
    }
    
    $rootScope.go = function(path){
       location.href="#"+path;
    }
    
    $rootScope.setCurrentStep = function(step){
        $rootScope.currentStep = step;
    }
    
    $rootScope.getCurrentStep = function(){
        return($rootScope.currentStep);
    }
    
    $rootScope.proceedStep = function(id,srcpath,isView) {
        var hasPath = function(param){ return location.hash.indexOf(param) !=-1};
        $rootScope.isView = hasPath("viewWidgets") || isView;
        var selectData = $rootScope.getSelectedData() && $rootScope.getSelectedData().data || null;
        var id = id || selectData && selectData.id ||'';
        var path = '';
        if(srcpath){
            path = id && srcpath && srcpath+id ||srcpath
        }
        else{
            path = id && (hasPath("viewWidgets")  && "/viewWidgets/"+id || hasPath("editWidgets") && "/editWidgets/"+id )
            ||"/addWidgets" ||'';
            path = (isView && "/viewWidgets/" + id) || path;
        }
        if(selectData || path=="/addWidgets"){
            $rootScope.go(path +'/step:'+$rootScope.getCurrentStep());}
        else{
         $rootScope.go('/');
        }
    }
    
    /*$rootScope.createModel = function(tempName,title,succClk,errClk){
        
      var alertInstance = $uibModal.open({
     
      templateUrl: tempName,
      controller: 'alertInstanceCtrl',
      resolve: {
       
      }
    });

    alertInstance.result.then(function (clk) {
       
    }, function () {
     
    });
    }*/
    
}]);
/* app.controller('alertInstanceCtrl', function ($scope, $uibModalInstance) {
    
    $scope.ok = function () {
      $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
    });*/