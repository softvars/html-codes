app.controller('productsCtrl', ['$scope', function ($scope,$rootScope) {
    $scope.doRemoveItem = function() {
        var prevSelect= angular.element(document.getElementsByClassName("stSelected"));
        var index = prevSelect.attr("idx");
        if (index && index !== -1) {
            $scope.productCollection.splice(index, 1);
            prevSelect.removeClass("stSelected");
            prevSelect.removeAttr("idx");
        }
    };
    $scope.doAddDublicate = function() {
        var prevSelect= angular.element(document.getElementsByClassName("stSelected"));
        var index = prevSelect.attr("idx");
        if (index && index !== -1) {
            $scope.productCollection.push($scope.productCollection[index]);
        }
    };
   $scope.setselectedData = function(data){
          var idx= $scope.productCollection.indexOf(data);
          var elt =event.currentTarget;
          var angElt =angular.element(elt)
          var prevSelect= angular.element(document.getElementsByClassName("stSelected"));
           prevSelect.removeClass("stSelected");
           prevSelect.removeAttr("idx");
           if(!angElt.hasClass("stSelected")){
               angElt.addClass("stSelected");
               angElt.attr("idx",idx);
           }
    };
  
    $scope.go = function(path){
       location.href="#"+path;
    }
    $scope.doModifyItem = function(){
        var selectedPrdtData = $scope.getSelectedData()
        if(selectedPrdtData && selectedPrdtData.idx){
            $scope.setCurrentStep(1);
            $scope.proceedStep(selectedPrdtData.data.id);
        }
    }

}]);