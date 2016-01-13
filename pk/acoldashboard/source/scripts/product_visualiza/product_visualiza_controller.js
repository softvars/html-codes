var app = angular.module('acolApp', ['smart-table','ngAnimate', 'ui.bootstrap','ngRoute', 'dndLists']);

//var productListObj = function 
app.run(function ($rootScope) {
    $rootScope.productCollection = [
        {"id":1100,"prodCode":"WEBSELLA2","name":"WebSella2","version":"0.1.ALPHA","descr":"","favorite":0,"numSteps":4,"templateCode":null,"createUser":"User","createDate":1451562186556,"updateDate":1451562186556,"updateUser":"User","properties":[{"id":50,"value":"TestValue1","code":"TestCode1","prod":"WEBSELLA"}],"releases":[],"steps":""},
        {"id":1100,"prodCode":"WEBSELLA1","name":"WebSella1","version":"0.1.ALPHA","descr":"","favorite":2,"numSteps":5,"templateCode":null,"createUser":"User","createDate":1451562186556,"updateDate":1451562186556,"updateUser":"User","properties":[{"id":50,"value":"TestValue1","code":"TestCode1","prod":"WEBSELLA"}],"releases":[],"steps":""},
        {"id":1100,"prodCode":"WEBSELLA3","name":"WebSella3","version":"0.1.ALPHA","descr":"","favorite":3,"numSteps":6,"templateCode":null,"createUser":"User","createDate":1451562186556,"updateDate":1451562186556,"updateUser":"User","properties":[{"id":50,"value":"TestValue1","code":"TestCode1","prod":"WEBSELLA"}],"releases":[],"steps":""},
        {"id":1100,"prodCode":"WEBSELLA4","name":"WebSella4","version":"0.1.ALPHA","descr":"","favorite":5,"numSteps":3,"templateCode":null,"createUser":"User","createDate":1451562186556,"updateDate":1451562186556,"updateUser":"User","properties":[{"id":50,"value":"TestValue1","code":"TestCode1","prod":"WEBSELLA"}],"releases":[],"steps":""}
    ];}
       
);
app.controller('productsCtrl', ['$scope', function ($scope,$rootScope) {
 
        $scope.doRemoveItem = function removeItem() {
        var prevSelect= angular.element(document.getElementsByClassName("stSelected"));
        var index = prevSelect.attr("idx");
        if (index !== -1) {
            $scope.productCollection.splice(index, 1);
        }
    };
       $scope.setselectedData = function(data){
          var idx= $rootScope.productCollection.indexOf(data);
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
    $scope.getSelectedData = function(){
        var prevSelect= angular.element(document.getElementsByClassName("stSelected"));
        var index = prevSelect.attr("idx");
        var obj = {'idx':index,'data':$rootScope.productCollection[index]};
        if (index !== -1) {
        return obj;}else{return false;}
    }
    $scope.go = function(path){
       location.href="#"+path;
    }
    $scope.doModifyItem = function(){
        var selectedPrdtData = $scope.getSelectedData()
        
        if(selectedPrdtData && selectedPrdtData.idx){
            $scope.go('/viewProduct');
        }
        
    }

}]);

app.controller('addProductCtrl', function ($scope, $rootScope) {
	$scope.go = function(path){
       location.href="#"+path;
    };
    $scope.doConfirm = function(){
        var getElement =function(id){return angular.element(document.getElementById(id))};
        var prodCode=getElement('prodCode').val();
        var name=getElement('name').val();
        var descr=getElement('descr').val();
        var numberofSteps=getElement('numberofSteps').val();
        var templateCode=getElement('templateCode').val();
        
        
        
    };
});

app.controller('addWidgetsForproductCtrl', function ($scope, $log) {
	$scope.widgetsCollection = ["widget1", "widget2"];
});

app.controller('productCtrl', function ($scope, $log) {
	
});
/*app.controller('addProductCtrl', function ($scope, $uibModal, $log) {

  $scope.items = ['Codice Prodotto','Nome prodotto'];

  $scope.animationsEnabled = true;

  $scope.addProduct = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'newPrdtContent.html',
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
});*/