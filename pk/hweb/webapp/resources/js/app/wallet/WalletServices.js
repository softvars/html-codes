;(function() {

  angular
    .module('hypeweb')
    .factory('WalletServices', WalletServices);

  WalletServices.$inject = ['$http', 'LocalStorage', 'QueryService'];

  function WalletServices($http, LocalStorage, QueryService) {
    var url = {
        getCardListUrl  : 'card/getCardList',
        addCardUrl      : 'card/add'
    };
  
    function getCardList(){
       var config = {
            method: 'GET',
            url: url.getCardListUrl
       }
       return QueryService.query(config);
    }
      
    function addCard(card){
       var config = {
            method: 'POST',
            url: url.addCardUrl,
            data: card,
            headers: {'Content-Type': 'application/json'}
       }
       return QueryService.query(config);
    }
      
    return {
      list: getCardList,
      add:  addCard
    };
  }
})();
