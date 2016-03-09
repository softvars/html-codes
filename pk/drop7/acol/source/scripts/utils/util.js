app.factory('util', ['$rootScope', function($rootScope){
    var util = {};
    util.go =  function(path){
      location.href = "#" + path;
    };
    
    util.hasPath = function(param){ 
        return location.hash.indexOf(param) != -1 ;
    };
    
    return util;
}]);