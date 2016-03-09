app.run(['$rootScope', '$http', 'productService','widgetService',"$uibModal", function ($rootScope, $http, productService,widgetService,$uibModal) {
    $rootScope.productCollection = [];
    $rootScope.initDone = false;
  //  productService.loadProductList();
  //  widgetService.getCategoryList();
    /*$rootScope.$watch('productCollection', function(productCollection) {
        $rootScope.productCollectionAsJson = angular.toJson(productCollection, true);
        if($rootScope.initDone) {
            productService.saveProductList();
        }
    }, true);*/

    $rootScope.currentStep=0;
    $rootScope.selectedData ={};
    $rootScope.models = {
        selected: null,
        product_allowed_types: ["widget"],
        product_steps: [],
        lists: {}       
    };
    
     $rootScope.getCategories = function(){
        widgetService.getCategoryList(function(res){
           $rootScope.categories = res && res.data && res.data.data ||[];
           $rootScope.getWidgets();
        })
    };
     $rootScope.widgetList = [];
     $rootScope.getWidgets = function(){
         for(var i = 0; i< $rootScope.categories.length;i++){
             var catList = $rootScope.categories[i];
             var catId =catList.code;
             $rootScope.models.lists[catId] =new Array();
             
             widgetService.getWidgetList(catId,function(res){
                 var resWidget = res && res.data && res.data.data ||[];
                 
                  for(var j=0;j< resWidget.length;j++){
/*                      var imgUrl = "/acol/app/images/"+resWidget[j].code+".JPG"
                      var id = resWidget[j].code;
                      var label = resWidget[j].name;
                      var url = imgUrl;
                      var catgId = resWidget[j].category.code;

                     $rootScope.models.lists[catgId].push({id:id, type:"widget", catId:catgId,
                                                        label: label,url:url, });*/
                      resWidget[j].type = "widget";
                      if(angular.isArray($rootScope.models.lists[resWidget[j].category.code])) {
                        $rootScope.models.lists[resWidget[j].category.code].push(resWidget[j]);
                      }

                }


            });
         }
    };
    $rootScope.getCategories();
    
    $rootScope.isWidgetAdded = function(item) {
        if(item) {
            var list = $rootScope.models.product_steps;
            if(list && list.length){
                for (i = 0; i < list.length; i++) {
                    if (list[i] && list[i].code === item.code) {
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
    
    $rootScope.createDataJson = function(obj){
        var index = $rootScope.productCollection.length-1;
        var selData = $rootScope.productCollection[index];
    
        var dataObj={};
        dataObj.id =obj.id || "";//((selData && selData.id) && (selData.id+1)) || 1 ;
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
        dataObj.steps = obj.steps ||[];
        return dataObj;
    };
     $rootScope.widgetDataJson = function(obj){
        var dataObj={};
        dataObj.descr ="";
        dataObj.name = obj.name || '';
        dataObj.widgets=[];
         var widgetObj ={};
        widgetObj.code=obj.code||'';
        widgetObj.bundleCode = obj.bundleCode ||'';
        widgetObj.position = obj.favorite ||'';
       dataObj.widgets.push(widgetObj);

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
    
    
    
    $rootScope.createModel = function(tempName,controller,succClk,errClk,obj){
        var tempobj = Object.keys(obj) ;
        $rootScope[tempobj[0]] = obj[tempobj];
      $rootScope.alertInstance = $uibModal.open({
     
      templateUrl: '/acol/app/templates/'+tempName,
      controller: controller || 'alertInstanceCtrl',
      resolve: {
       obj:obj
      }
    });

    $rootScope.alertInstance.result.then(function() {
        if(succClk)succClk();
      // $uibModalInstance.close();
    }, function () {
        if(errClk) errClk();
       //  $uibModalInstance.dismiss('cancel');
    });
    }
    
}]);
 app.controller('alertInstanceCtrl', function ($scope, $uibModalInstance) {
    
    $scope.ok = function () {
      $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
    });