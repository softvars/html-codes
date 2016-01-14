app.controller("addWidgetsForproductCtrl", function($scope) {

    $scope.models = {
        selected: null,
        product_steps: [{id:1, widgetId:"A1"}],
        lists: {"A": [], "B": []}
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({id:"A"+i, label: "Widget A" + i});
        $scope.models.lists.B.push({id:"B"+i, label: "Widget B" + i});
    }

    // Model to JSON for persist the widget config purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

});
