var TransactionController = function()
{
    BaseController.call(this);
    this.getTransactionsUrl = "/upweb/auth/transaction/list";
    this.transactions_request_data = null;
    this.transactions = null;
    this.isTransactionListEmpty = false;
    this.printTransactions = null;
    this.transactionAttributeListHTML = null;
    this.pagination = null;
    this.pattern_timezone = /[\-+]\d{4}$/;
    this.TXN_STATUS_LIST = {completed:'eseguita', denied:'negata', rejected:'stornata', deleted: 'cancellata'};
    this.TXN_STATUS_LIST_1 = { TRANSACTION_AUT:'eseguita', TRANSACTION_MOV:'eseguita', TRANSACTION_AUT_BOLPAG:'eseguita',
                                TRANSACTION_CAN:'cancellata', 
                                TRANSACTION_DENIED:'negata', TRANSACTION_FAILED:'negata',
                                TRANSACTION_STO:'stornata', TRANSACTION_MOV_BOLSTO:'stornata'};
    this.TXN_STATUS_LIST_2 = {eseguita:'completed', negata:'denied', stornata:'reversed', cancellata: 'deleted'};
    this.MONTHS_SHORT = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
    this.MONTHS_FULL = ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];
    /* // We are created the month short name as constant here, we are commenting the lines and keeping it for future ref.
    this.MONTHS_SHORT = this.$from_date_picker.component.settings.monthsShort;
    this.MONTHS_FULL = this.$from_date_picker.component.settings.monthsFull; */
};

TransactionController.prototype = Object.create(BaseController.prototype);
TransactionController.prototype.constructor = TransactionController;

TransactionController.prototype.MESSAGES = {
    no_result_title: "Nessun risultato trovato",
    no_result_sub_title: "Inserisci un altro filtro di ricerca"
};

TransactionController.prototype.txnDataTidy = function(callback) {
    var thisObj = this;
    if(this.transactions != null)
    {
        _.each(this.transactions ,function(transaction, idx, list){
            transaction.meta = {};
            transaction.meta.idx = idx;
            var datetime = transaction.datetime;
            if(datetime) {
               var date = new Date(datetime);
               if(!date || (_.isNaN(date.getMonth()) || date.toString() === "Invalid Date")) {
            	   var temp = thisObj.pattern_timezone.exec(datetime);
            	   if(temp && temp.length) {
            		   var temp_ = temp[0].substr(0,3) +":"+ temp[0].substr(3,2);
	            	   var datetime_ = datetime.replace(thisObj.pattern_timezone, temp_);
	            	   date = new Date(datetime_);
        		   }
               }
               transaction.meta.date = date;
               transaction.meta.dateTokens = [];
               transaction.meta.status = thisObj.TXN_STATUS_LIST_1[transaction.status];
               if(date && !(_.isNaN(date.getMonth())))
               {
	               transaction.meta.dateTokens[0] = date.getMonth();
	               transaction.meta.dateTokens[1] = date.getDate();
	               transaction.meta.dateTokens[2] = date.getFullYear() % 100;
               } else {
            	   //Error should be logged
               }
            }
            if(transaction.aliasCreditCard) {
                transaction.meta.aliasCreditCard = transaction.aliasCreditCard.toLowerCase();
            }
            if(transaction.description) {
            	transaction.meta.description = transaction.description.toLowerCase();
            }
            if(transaction.payedTo) {
            	transaction.meta.payedTo = transaction.payedTo.toLowerCase();
            }
            if(transaction.paymentMethodId) {
                transaction.meta.cardFilter = transaction.paymentMethodId;
            }
        });
    }
    callback();
};

TransactionController.prototype.renderTransactions = function(data) {
    $(".transactions-container").html( this.printTransactions( {transactions:data, pagination:this.pagination} ) );
    $(window).scrollTop(0);
};

TransactionController.prototype.loadTransactions = function(data) {
    if(this.pagination && typeof this.pagination == 'object') {
        this.pagination.init({result:data});
        data = this.pagination.getPage(1);
    }
    this.renderTransactions(data);
};

TransactionController.prototype.getTransactions = function() {
    var thisObj = this;
    if(this.printTransactions == null) this.printTransactions = _.template($('#transactionTemplate').html());
    
    var request_done = function(response) {
    	var transactions = response.data;
        thisObj.isTransactionListEmpty = !transactions || !transactions.length;
        thisObj.transactions = transactions;
        thisObj.txnDataTidy(function(){
            thisObj.loadTransactions(thisObj.transactions);
        });
        $("body").trigger("transactions_list_loaded");
    };
    var config = {
        data: this.transactions_request_data,
        url: this.getTransactionsUrl
    },
    app_config = {
        scope:  thisObj, 
        done:   request_done 
    };
    _.ajax(config, app_config);
};

TransactionController.prototype.updateTransactionDetailsOverlay = function(transactionIdx) {
    var transaction = this.transactions[transactionIdx];
    if(!transaction) return;
    
	var isPaymentItemTypeBollette = transaction.paymentItemType && transaction.paymentItemType.toLowerCase() === 'bollette'; 
    
    var $transaction_modal = $('.modal#modal-detail-transaction');
    $transaction_modal.find('.row.head .num').html(transaction.transId);
    var date = transaction.meta.date;
    if(date)
    {
    	var timeString =  date.toTimeString().substring(0, 8);
        var dateString = date.getDate() + '  ' +  this.MONTHS_FULL[date.getMonth()] + '  ' + date.getFullYear();
        $transaction_modal.find('.row.transaction .date-only').html(dateString);
        $transaction_modal.find('.row.transaction .time').html(timeString);
    }
    $transaction_modal.find('.row.transaction .beneficiary').html(transaction.payedTo);
    $transaction_modal.find('.row.transaction .card .name').html(transaction.aliasCreditCard);
    $transaction_modal.find('.row.transaction .card .type').html(transaction.payedWith + ' ' + transaction.creditCard);
    $transaction_modal.find('.row.transaction .amount span').html(transaction.totalOrderPrice);
    $transaction_modal.find('.row.transaction .state').html(transaction.meta.status);
    
    if(this.transactionAttributeListHTML == null) this.transactionAttributeListHTML = _.template($('#transactionDetailsAttributeListTemplate').html());
    
    var attributes = {};
    attributes['dettaglio dell&#39;acquisto'] = transaction.description;
    attributes['codice identificativo bollettino'] = transaction.serialNumber;
    attributes['codice autorizzativo'] = transaction.authorizationCode;
    attributes['merchant Phone nro'] = transaction.merchantPhonenro;
    attributes['codice ordine'] = transaction.merchantOrderCode;
    attributes['merchant Email'] = transaction.merchantEmail;
    attributes['loyalty Code'] = transaction.loyaltyCode;
    attributes['n&#176; operazione'] = transaction.operationNro;
    if(isPaymentItemTypeBollette) {
    	attributes['importo bolletta'] = transaction.singleItemPrice;
    	attributes['importo commissioni'] = transaction.fee;
    } else {
    	attributes['quantit&#224'] = transaction.quantity;
    }
    
    var attributes_ = {};
    _.each(attributes, function(value, key){
        if(isNotEmpty(value)) {
            this[key] = value;
        }
    }, attributes_);
    $transaction_modal.find(".details .grid-details").html( this.transactionAttributeListHTML({attributes:attributes_}) );
};

TransactionController.prototype.updateTransactionDetailsOverlayStyle = function($modal) {
    var $detailTransaction = $modal.find('.transaction');
    var beneficiaryHeight = $detailTransaction.find('.upper .beneficiary').height() + 3;
    var cssHeight = {'height': beneficiaryHeight + "px"};
    $detailTransaction.find('.upper').css(cssHeight);
    var dateHeight = (beneficiaryHeight + 33);
    cssHeight['height'] = dateHeight + "px";
    cssHeight['padding-top'] =  (dateHeight / 4)  + "px";
    $detailTransaction.find('.date').css(cssHeight);
};

$(function() {
    var txnObj_ = typeof dashboardObj !== "undefined" ?  dashboardObj : (typeof transactionsObj !== "undefined" ? transactionsObj : null);
    $(document.body).on('update_transaction_details_overlay', function(e, element){
        var $element = $(element);
        var transactionIdx = $element.data('idx');
        txnObj_.updateTransactionDetailsOverlay(transactionIdx);
    });
    
    $(document.body).on('click', '.ellipsis', function(e){
        e.preventDefault();
        return false;
    });
    
    $(document.body).on('shown.bs.modal', function (e) {
    	var modal_id = e.target.id;
    	if(modal_id === 'modal-detail-transaction') {
    		var $modal = $('#'+modal_id);
    		txnObj_.updateTransactionDetailsOverlayStyle($modal);
    	}
	});
});