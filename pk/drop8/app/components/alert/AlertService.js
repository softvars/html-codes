(function() {
  angular
    .module('dashboardApp')
    .factory('AlertService', AlertService);

  AlertService.$inject = ['$rootScope'];

  function AlertService($rootScope) {
      var self = this;
      var TYPE = {};
      TYPE.SUCCESS = 'success';
      TYPE.INFO = 'info';
      TYPE.WARNING = 'warning';
      TYPE.ERROR = 'danger';
      self.alerts = [];
      
      function get() {
        return self.alerts;
      }
      
      function add(msg, type) {
        var alert = {msg: msg};
        if(type) alert.type = type;
        self.alerts.push(alert);
        return self.alerts;
      }

      function addSuccess(msg) {
        return add(msg, TYPE.SUCCESS);
      }

      function addError(msg) {
        return  add(msg, TYPE.ERROR);
      }

      function close(index) {
        self.alerts.splice(index, 1);
      }
      
    return {
      type: TYPE,
      add: add,
      addSuccess: addSuccess,
      addError: addError,
      get: get,
      close: close
    };
  }
})();
