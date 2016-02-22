angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  
      
    .state('menu', {
      url: '/side-menu21',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })
      
    
      
        
    .state('menu.vPay', {
      url: '/vpay/init',
      views: {
        'side-menu21': {
          templateUrl: 'templates/vPay.html'
        }
      }
    })
        
      
    
      
        
    .state('groups', {
      url: '/group/list',
      templateUrl: 'templates/groups.html'
    })
        
      
    
      
        
    .state('group', {
      url: '/group/new',
      templateUrl: 'templates/group.html'
    })
        
      
    
      
        
    .state('receipt', {
      url: '/receipt',
      templateUrl: 'templates/receipt.html'
    })
        
      
    
      
        
    .state('vPayRequestInitiated', {
      url: '/payment',
      templateUrl: 'templates/vPayRequestInitiated.html'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/side-menu21/vpay/init');
  

  

});