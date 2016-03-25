(function(){
angular.module('dashboardApp').controller("productsCtrl",productsCtrl);
productsCtrl.$inject=["$scope", "$route", "$routeParams","productFactory", "$uibModal"];
function productsCtrl($scope, $route, $routeParams, productFactory, $uibModal) {
    productFactory.loadProductList();
    
};

})();


