app.controller("addWidgetsForproductCtrl", function($scope) {

    $scope.models = {
        selected: null,
        product_steps: [],
        lists: {"A": [], "B": []},
        wlist:[]
    };
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({id:"A"+i, type:"widget", catId:"WA" + i, label: "Widget A" + i});
        $scope.models.lists.B.push({id:"B"+i, type:"widget", catId:"WB" + i, label: "Widget B" + i});
        //$scope.models.lists.steps.push({id:"step"+i, type:"step", widgetId:"WS" + i, label: "Widget S" + i});
    }
    $scope.models.product_steps.push({id:"A1", type:"step", catId:"WA1", label: "Widget 0A1"});
    $scope.models.product_steps.push({id:"A2", type:"step", catId:"WA2", label: "Widget 0A2"});
    
    // Model to JSON for persist the widget config purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
});
