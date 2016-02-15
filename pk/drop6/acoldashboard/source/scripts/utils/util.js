app.factory('util', ['$rootScope', function($rootScope){
    var util = {};
    util.go =  function(path){
      location.href = "#" + path;
    };
    
    return util;
}]);