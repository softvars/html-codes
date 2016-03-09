/**
 * Wallet Controller
 */

;(function() {

  angular
    .module('hypeweb')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', 'LocalStorage', 'QueryService'];

  function DashboardController($scope, LocalStorage, QueryService) {
      
    $scope.showAppAd = true;
    
    var self = this;
    self.list_size = 0;
      
    self.TXN_STATUS_LIST = {completed:'eseguita', denied:'negata', rejected:'stornata', deleted: 'cancellata'};
    self.TXN_STATUS_LIST_1 = { TRANSACTION_AUT:'eseguita', TRANSACTION_MOV:'eseguita', TRANSACTION_AUT_BOLPAG:'eseguita',
                                TRANSACTION_CAN:'cancellata', 
                                TRANSACTION_DENIED:'negata', TRANSACTION_FAILED:'negata',
                                TRANSACTION_STO:'stornata', TRANSACTION_MOV_BOLSTO:'stornata'};
    self.TXN_STATUS_LIST_2 = {eseguita:'completed', negata:'denied', stornata:'reversed', cancellata: 'deleted'};
    self.MONTHS_SHORT = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
    self.MONTHS_FULL = ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];

      //self.cards = [];
      //self.cards = sampleCardRes.WalletCardDetail.WalletCard;
      
  }

})();