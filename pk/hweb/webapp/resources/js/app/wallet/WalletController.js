/**
 * Wallet Controller
 */

;(function() {

  angular
    .module('hypeweb')
    .controller('WalletController', WalletController)
    .controller('AddCardModalInstanceCtrl', AddCardModalInstanceCtrl);

  WalletController.$inject = ['$scope', '$rootScope', '$uibModal', 'LocalStorage', 'WalletServices'];

  function WalletController($scope, $rootScope, $uibModal, LocalStorage, WalletServices) {

    var self = this;
    $scope.showProfileHeader = true;
/*    var sampleCardRes = {
	"WalletCardDetail" : {
		"WalletResponse" : {
			"statusCode" : "0000",
			"groupCode" : "0000",
			"statusMsg" : "OK",
			"description" : "Success"
		},
		"WalletCard" : [{
			"id" : "28",
			"cardAlias" : "Arun_TEST",
			"cardHolderName" : "PFTBJIIMN",
			"cardHolderSurName" : "XKBWR",
			"maskedPan" : "4294 41** **** 2011",
			"circuitName" : "VISA",
			"expiryMonth" : "03",
			"expiryYear" : "17",
			"cardCountry" : "ITALIA",
			"certified" : "N",
			"preferred" : "N"
		},{
			"id" : "29",
			"cardAlias" : "Prakash_TEST",
			"cardHolderName" : "PFTBJIIMN",
			"cardHolderSurName" : "XKBWR",
			"maskedPan" : "4294 41** **** 2011",
			"circuitName" : "VISA",
			"expiryMonth" : "03",
			"expiryYear" : "17",
			"cardCountry" : "ITALIA",
			"certified" : "N",
			"preferred" : "N"
		},{
			"id" : "30",
			"cardAlias" : "Prakash_TEST",
			"cardHolderName" : "PFTBJIIMN",
			"cardHolderSurName" : "XKBWR",
			"maskedPan" : "4294 41** **** 2011",
			"circuitName" : "VISA",
			"expiryMonth" : "03",
			"expiryYear" : "17",
			"cardCountry" : "ITALIA",
			"certified" : "N",
			"preferred" : "N"
		},{
			"id" : "31",
			"cardAlias" : "Prakash_TEST",
			"cardHolderName" : "PFTBJIIMN",
			"cardHolderSurName" : "XKBWR",
			"maskedPan" : "4294 41** **** 2011",
			"circuitName" : "VISA",
			"expiryMonth" : "03",
			"expiryYear" : "17",
			"cardCountry" : "ITALIA",
			"certified" : "N",
			"preferred" : "N"
		}]
	}
};
      self.cards = [];
      //self.cards = sampleCardRes.WalletCardDetail.WalletCard;
      //self.cards.push(sampleCardRes.WalletCardDetail.WalletCard);
      
/*      WalletServices.list().then(function(result) {
          if(result && result.response && result.response.statusMsg == "OK") {
            self.cards = result.cardList;
          }
      });*/
      
     self.flags = { 
          showAddModal : false 
     };
    
     self.getUserInfo = function () {
                
      return {
          'displayName':'Praksah S',
          'firstName': 'Prakash',
          'lastName': 'Subramani'
      };
    }
     self.showAddCard = function () {
        var modalInstance = $uibModal.open({    
          animation: false,
          templateUrl: $rootScope.templates .wallet_add,
          controller: 'AddCardModalInstanceCtrl',
          resolve: {
            userInfo: self.getUserInfo
          }
        });

        modalInstance.result.then (
            function (cardData) {
                self.addCard(cardData);
            }, 
            function () {
              console.log('Modal dismissed at: ' + new Date());
            }
        );
      };
      
      self.addCard = function (card) {
          WalletServices.add(card).then(function(result) {
              if(result && result.response && result.response.statusMsg == "OK") {
                  // todo:
              }
          });
      };
    }
    
    AddCardModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'userInfo'];
    
    function AddCardModalInstanceCtrl($scope, $uibModalInstance, userInfo) {
        $scope.userInfo = userInfo;
        
        $scope.card = {
            cardAlias : '',
            pan : '',
            cardHolderName : userInfo.firstName || '',
            cardHolderSurName : userInfo.lastName || '',
            circuitName : '',
		    expiryDate : '',
            cvv: '',
            preferred : false
            //"certified" : "N",
        }

        //$scope.reset = angular.copy($scope.card);
        console.log("AddCardModalInstanceCtrl:init:card:"+ angular.toJson($scope.card));
        $scope.send = function (event) {
            var cardData = angular.copy($scope.card);
            //console.log("AddCardModalInstanceCtrl:send:$scope.card:"+ angular.toJson($scope.card));
            console.log("AddCardModalInstanceCtrl:send:cardData:"+ angular.toJson(cardData));
            $uibModalInstance.close(cardData);
            //$scope.card = angular.copy($scope.reset);
            event.preventDefault();
        };

        $scope.cancel = function () {
            //$scope.card = angular.copy($scope.reset);
            console.log("AddCardModalInstanceCtrl:cancel:card:"+ angular.toJson($scope.card));
            $uibModalInstance.dismiss('cancel');
        };
    }

})();