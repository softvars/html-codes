app.controller('productsCtrl', ["$scope", "$route", "$routeParams","productService", "util", 
  function ($scope, $route, $routeParams, productService, util) {
    $scope.enable_button = false;
    
    $scope.doRemoveItem = function() {
        var prevSelect= angular.element(document.getElementsByClassName("stSelected"));
        var index = prevSelect.attr("data-idx");
        if (index && index !== -1) {
            productService.deleteProduct(index, function(res){
            $scope.selectedData.data =  res.data.data[0];
            productService.loadProductList();
            prevSelect.removeClass("stSelected");
            prevSelect.removeAttr("idx");
             $scope.enable_button=false;
        })}
        
        /*var prevSelect= angular.element(document.getElementsByClassName("stSelected"));
        var index = prevSelect.attr("idx");
        if (index && index !== -1) {
            $scope.productCollection.splice(index, 1);
            prevSelect.removeClass("stSelected");
            prevSelect.removeAttr("idx");
             $scope.enable_button=false;
        }*/
    };
    $scope.doAddDublicate = function() {
        var prevSelect= angular.element(document.getElementsByClassName("stSelected"));
        var index = prevSelect.attr("idx");
        if (index && index !== -1) {
            $scope.productCollection.push($scope.productCollection[index]);
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

    $scope.doModifyItem = function(){
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
    

}]);