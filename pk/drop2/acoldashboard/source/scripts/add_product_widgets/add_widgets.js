app.controller("addWidgetsForproductCtrl", function($scope) {

    $scope.models = {
        selected: null,
        product_steps: [],
        lists: {"A": [], "B": []}
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({id:"A"+i, widgetId:"WA1" + i, label: "Widget A" + i});
        $scope.models.lists.B.push({id:"B"+i, widgetId:"WB1" + i, label: "Widget B" + i});
    }
    $scope.models.product_steps.push({id:"A1", widgetId:"WA1", label: "Widget A1"});

    // Model to JSON for persist the widget config purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

    $scope.dropCallback = function(event, index, item, external, type, allowedType) {
        if (external) {
            if (allowedType === 'itemType' && !item.label) return false;
            if (allowedType === 'containerType' && !angular.isArray(item)) return false;
        }
        return item;
    };
});
