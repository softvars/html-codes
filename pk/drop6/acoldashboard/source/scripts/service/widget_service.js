app.factory('widgetService', ['$http', '$rootScope', function($http, $rootScope){
    var widgetAPI = {};
    
    widgetAPI.getCategoryList = function(cbk){
        return $http({
                method: 'GET',
                url: '/category'
            }).then(function successCallback(response) {
            if(cbk){cbk(response);}
                var data = response.data && response.data.data||[];
                return data;
            });
    };
     widgetAPI.getWidgetList = function(category,cbk){
        return $http({
                method: 'GET',
                url: '/widget?category='+category
            }).then(function successCallback(response) {
              if(cbk){cbk(response);}
                var data = response.data && response.data.data||[];
                return data;
            });
    };
    
    widgetAPI.createStep = function(id,data, cbk) {
        return $http({
                method: 'POST',
                data: angular.toJson(data),
                headers: {'Content-Type': 'application/json'},
                url: '/product/'+id+'/step'
            }).then(function successCallback(response) {
                if(cbk) { cbk(response)};
                console.log("response :" + response);
            });
    };
     widgetAPI.getStepWidgets = function(id,cbk) {
        return $http({
                method: 'GET',
                url: '/product/'+id+'/step'
            }).then(function successCallback(response) {
                if(cbk) { cbk(response)};
                console.log("response :" + response);
            });
    };

    
    return widgetAPI;
}]);