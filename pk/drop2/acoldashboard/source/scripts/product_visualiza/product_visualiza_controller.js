var app = angular.module('acolApp', ['smart-table','ngAnimate', 'ui.bootstrap','ngRoute', 'dndLists']);

//var productListObj = function 
app.run(function ($rootScope) {
    $rootScope.productCollection = [
        {"id":1100,"prodCode":"WEBSELLA2","name":"WebSella2","version":"0.1.ALPHA","descr":"","favorite":0,"numSteps":4,"templateCode":null,"createUser":"User","createDate":1451562186556,"updateDate":1451562186556,"updateUser":"User","properties":[{"id":50,"value":"TestValue1","code":"TestCode1","prod":"WEBSELLA"}],"releases":[],"steps":""},
        {"id":1100,"prodCode":"WEBSELLA1","name":"WebSella1","version":"0.1.ALPHA","descr":"","favorite":2,"numSteps":5,"templateCode":null,"createUser":"User","createDate":1451562186556,"updateDate":1451562186556,"updateUser":"User","properties":[{"id":50,"value":"TestValue1","code":"TestCode1","prod":"WEBSELLA"}],"releases":[],"steps":""},
        {"id":1100,"prodCode":"WEBSELLA3","name":"WebSella3","version":"0.1.ALPHA","descr":"","favorite":3,"numSteps":6,"templateCode":null,"createUser":"User","createDate":1451562186556,"updateDate":1451562186556,"updateUser":"User","properties":[{"id":50,"value":"TestValue1","code":"TestCode1","prod":"WEBSELLA"}],"releases":[],"steps":""},
        {"id":1100,"prodCode":"WEBSELLA4","name":"WebSella4","version":"0.1.ALPHA","descr":"","favorite":5,"numSteps":3,"templateCode":null,"createUser":"User","createDate":1451562186556,"updateDate":1451562186556,"updateUser":"User","properties":[{"id":50,"value":"TestValue1","code":"TestCode1","prod":"WEBSELLA"}],"releases":[],"steps":""}
    ];
    $rootScope.createDataJson = function(obj){
        var dataObj={};
        dataObj.id =obj.id || '';
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
      $rootScope.getSelectedData = function(){
        var prevSelect= angular.element(document.getElementsByClassName("stSelected"));
        var index = prevSelect.attr("idx");
        var obj = {'idx':index,'data':$rootScope.productCollection[index]};
        if (index !== -1) {
        return obj;}else{return false;}
    }
       $rootScope.go = function(path){
       location.href="#"+path;
    }
    $rootScope.createSteps = function(steps,isfromNew){
    
    }
}     
);
app.controller('productsCtrl', ['$scope', function ($scope,$rootScope) {
    
        $scope.doRemoveItem = function() {
        var prevSelect= angular.element(document.getElementsByClassName("stSelected"));
        var index = prevSelect.attr("idx");
        if (index !== -1) {
            $scope.productCollection.splice(index, 1);
        }
    };
    $scope.doAddDublicate = function() {
        var prevSelect= angular.element(document.getElementsByClassName("stSelected"));
        var index = prevSelect.attr("idx");
        if (index !== -1) {
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
            $scope.go('/viewProduct');
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
       
    };
});

app.controller('productCtrl', function ($scope,$rootScope) {
    $scope.selectedData = $scope.getSelectedData();
    console.log($scope.selectedData);
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