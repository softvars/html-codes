app.factory('widgetService', ['$http', '$rootScope', function($http, $rootScope){
    var widgetAPI = {};
    
    widgetAPI.getCategoryList = function(cbk){
        return $http({
                method: 'GET',
                url: '/api/category'
            }).then(function successCallback(response) {
            if(cbk){cbk(response);}
                var data = response.data && response.data.data||[];
                return data;
            });
    };
     widgetAPI.getWidgetList = function(category,cbk){
        return $http({
                method: 'GET',
                url: '/api/widget?category='+category
            }).then(function successCallback(response) {
              if(cbk){cbk(response);}
                var data = response.data && response.data.data||[];
                return data;
            });
    };
    
    return widgetAPI;
}]);