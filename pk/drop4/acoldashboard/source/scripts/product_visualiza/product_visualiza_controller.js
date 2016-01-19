//var app = angular.module('acolApp', ['smart-table','ngAnimate', 'ui.bootstrap','ngRoute', 'dndLists']);

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

app.controller('addProductCtrl', function ($scope, $rootScope) {
	
    $scope.doConfirm = function(){
        var getElement =function(id){return angular.element(document.getElementById(id))};
        var prodCode=getElement('prodCode').val();
        var name=getElement('name').val();
        var descr=getElement('descr').val();
        var numberofSteps=getElement('numberofSteps').val();
        var templateCode=getElement('templateCode').val();
        var postObj = {"prodCode":prodCode,"name":name,"descr":descr,"numberofSteps":numberofSteps,"templateCode":templateCode}
        $scope.productCollection.push($scope.createDataJson(postObj));
        $scope.setCurrentStep(1);
        $scope.go('/addWidgets')
       
    };
});

app.controller('pdtPropertyCtrl', function ($scope, $uibModal, $log) {

  $scope.items = [];

  $scope.animationsEnabled = true;

  $scope.addProductProperty = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'source/templates/templ_product_property.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});



app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});