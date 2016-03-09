app.factory('widgetService', ['$http', '$rootScope', function($http, $rootScope){
    var widgetAPI = {};

    widgetAPI.getCategoryList = function(cbk){
         $rootScope.startLoading();
        return $http({
                method: 'GET',
                url: '/category'
            }).then(function successCallback(response) {
             $rootScope.stopLoading();
            if(cbk){cbk(response);}
                var data = response.data && response.data.data||[];
                return data;
            },function errorCallback(response){
                console.log(response);
             $rootScope.stopLoading();
            });
    };
     widgetAPI.getWidgetList = function(category,cbk){
            $rootScope.startLoading();
        return $http({
                method: 'GET',
                url: '/widget?category='+category
            }).then(function successCallback(response) {
             $rootScope.stopLoading();
              if(cbk){cbk(response);}
                var data = response.data && response.data.data||[];
                return data;
            },function errorCallback(response){
                console.log(response);
             $rootScope.stopLoading();
            });
    };
    
    widgetAPI.createStep = function(id,data, cbk) {
           $rootScope.startLoading();
        return $http({
                method: 'POST',
                data: angular.toJson(data),
                headers: {'Content-Type': 'application/json'},
                url: '/product/'+id+'/step'
            }).then(function successCallback(response) {
             $rootScope.stopLoading();
                if(cbk) { cbk(response)};
                console.log("response :" + response);
            },function errorCallback(response){
                console.log(response);
             $rootScope.stopLoading();
            });
    };
    widgetAPI.getStepWidgets = function(id,cbk,step) {
           $rootScope.startLoading();
        return $http({
                method: 'GET',
                url: '/product/'+id+'/step/'+step
            }).then(function successCallback(response) {
             $rootScope.stopLoading();
                if(cbk) { cbk(response)};
                console.log("response :" + response);
            },function errorCallback(response){
                console.log(response);
             $rootScope.stopLoading();
            });
    };


    return widgetAPI;
}]);