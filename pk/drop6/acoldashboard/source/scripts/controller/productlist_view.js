app.controller('productsCtrl', ["$scope", "$route", "$routeParams","productService", "util","DTOptionsBuilder","DTColumnDefBuilder","$uibModal",
  function ($scope, $route, $routeParams, productService, util, DTOptionsBuilder, DTColumnDefBuilder,$uibModal) {
    $scope.enable_button = false;
      $(".side-bar-view").hide();
    $scope.doRemoveItem = function(index) {
    //    var prevSelect= angular.element(document.getElementsByClassName("stSelected"));
       // var index = prevSelect.attr("data-idx");
        if (index && index !== -1) {
            productService.deleteProduct(index, function(res){
            $scope.selectedData.data =  res.data.data[0];
            productService.loadProductList();
          /*  prevSelect.removeClass("stSelected");
            prevSelect.removeAttr("idx");*/
             $scope.enable_button=false;
        })}
        
     
    };
    $scope.doAddDublicate = function() {
        var prevSelect= $(".stSelected");
        var prevSelectData= $(".stSelected").data();
        var selctObj = prevSelectData.$scope.row;
         $scope.selectedData.data = selctObj;
        var index = prevSelect.attr("data-idx");
        if (index && index !== -1) {
             productService.copyProduct($scope.selectedData.data,"light",function(res){
                 productService.loadProductList();
             })
        }
        else{
            alert("Please select the product");
        }
    };

    $scope.setselectedData = function(data){
        var idx = $scope.productCollection.indexOf(data);
        var elt = event.currentTarget;
        var angElt =angular.element(elt)
        var prevSelect= angular.element(document.getElementsByClassName("stSelected"));
        prevSelect.removeClass("stSelected");
        prevSelect.removeAttr("idx");
        if(!angElt.hasClass("stSelected")){
           angElt.addClass("stSelected");
           angElt.attr("idx",idx);
            $scope.enable_button=true;
        }
        $scope.selected = data;
    };
  
    $scope.go = function(path){
       location.href = "#"+path;
    };

    $scope.doModifyItem = function(id){
        var selectedPrdtData = $scope.selected;
        if(selectedPrdtData && selectedPrdtData.id){
            productService.doCache(null, selectedPrdtData);
            util.go("/editWidgets/"+ selectedPrdtData.id +"/step/1");
        }
    };

    $scope.doOpenItem = function(data) {
        var selectedPtd = data || $scope.selected;
        if(selectedPtd) {
            productService.doCache(null, selectedPtd);
            util.go("/viewWidgets/"+ selectedPtd.id +"/step/1");
        }
    };
    
    $scope.predicate = 'prodCode';
    $scope.reverse = false;
    $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };
      productService.loadProductList();

  $scope.rowCallback= function(data) {
      $(".stSelected").removeClass("stSelected");
      $(event.currentTarget).addClass("stSelected");
       $scope.selected = data.row;
       $scope.enable_button=true;
      console.log($scope.selected);

};
$scope.doUpdateProduct =function(product){
    $scope.product = product;
    var  sucCbk = function(){
          productService.loadProductList();
    };
    var  errCbk = function(){
        $scope.alertInstance.close();
    };
    $scope.createModel('confirmAlert.html','productsCtrl',sucCbk,errCbk,{product : $scope.product});
};
 $scope.cancel = function(){
      $scope.alertInstance.close();
 };
  $scope.ok = function (elt) {
   
        productService.updateProduct($scope.product,function(res){ 
        $scope.alertInstance.close();
        
        })
 

  };
}]);




