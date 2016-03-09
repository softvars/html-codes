app.controller("htmlEditorController",['$scope','$http', function($scope,$http) {
    $scope.storeCKEditor = function(element){
        var postParam = {htmlContent : readCKEditor(element)};
        var onSuccess = function(response){
            console.log("response ",response);
        };
        var onError = function(error){
            console.log("error ",error);modes
        };
        var data = {$http:$http,url:"",postParam:postParam,onSuccess:onSuccess,onError:onError};
        httpPost(data);
    }
    $scope.storeTinymceEditor = function(element){
        var postParam = {htmlContent : readTinyMceEditor(element)};
        var onSuccess = function(response){
            console.log("response ",response);
        };
        var onError = function(error){
            console.log("error ",error);modes
        };
        var data = {$http:$http,url:"",postParam:postParam,onSuccess:onSuccess,onError:onError};
        httpPost(data);
    }
}]);

/*
app.config(['$routeProvider',
                    function($routeProvider) {
                        $routeProvider.
                        when('/ckeditor', {
                            templateUrl: 'acol/app/templates/ckeditorTemplate.html',
                            controller: 'htmlEditorController'
                        }).
                        when('/tinemceeditor', {
                            templateUrl: 'acol/app/templates/tinymceeditorTemplate.html',
                            controller: 'htmlEditorController'
                        }).
                        otherwise({
                            redirectTo: '/ckeditor'
                        });
                    }]);
*/


app.directive('ckEditor', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        controller: 'htmlEditorController',
        compile: function(element, attrs) {
            var editorHTML = '<textarea name="'+attrs.type+'" id="'+attrs.type+'"></textarea>';
            element.replaceWith(editorHTML);
            createCKEditor(attrs.type);
        }
    };
});

app.directive('tinymceEditor', function() {
    return {
        restrict: 'E',
        controller: 'htmlEditorController',
        compile: function(element, attrs) {
            var editorHTML = '<textarea name="'+attrs.type+'" id="'+attrs.type+'"></textarea>';
            element.replaceWith(editorHTML);
            createTinyMceEditor(attrs.type);

        }
    };
});

