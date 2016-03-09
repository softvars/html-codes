var TransactionAllController = function () {
    TransactionController.call(this);
    this.getCardsUrl = "/upweb/auth/wallet/cards";
    this.transactions_request_data = "sortBy=date";
    this.printCards = null;
    this.cards = null;
    this.$datepicker_input = null;
    this.$from_date = null;
    this.$to_date = null;
    this.$from_date_picker = null;
    this.$to_date_picker = null;
    this.pagination = new PaginationController();
};

TransactionAllController.prototype = Object.create(TransactionController.prototype);
TransactionAllController.prototype.constructor = TransactionAllController;

TransactionAllController.prototype.filter = {
    fromDate	: null,
    toDate		: null,
    description	: null,
    beneficiary	: null,
    txnStatus	: null,
    cards: {
        status: {},
        checkedFew: false,
        checkedAll:  false
    }
};

TransactionAllController.prototype.$datepicker_inputs = null;
TransactionAllController.prototype.datepicker_config = {
    format: 'dd/mm/yyyy',
    formatSubmit: 'dd/mm/yyyy',
    max: true,
    editable: true,
    hiddenName: true,
    today: '',
    clear: '',
    close: '',
    klass: {
        input: ''
    }
};

TransactionAllController.prototype.initDatepickers = function(){
	var $datepickers = $('.datepicker');
	if($datepickers.length && $datepickers.pickadate){
		this.$datepicker_inputs = $datepickers.pickadate(this.datepicker_config);
	    this.$from_date = this.$datepicker_inputs ? this.$datepicker_inputs.filter('.from__datepicker') : null;
	    this.$to_date = this.$datepicker_inputs ? this.$datepicker_inputs.filter('.to__datepicker') : null;
	    this.$from_date_picker = this.$from_date ? this.$from_date.pickadate('picker') : null;
	    this.$to_date_picker = this.$to_date  ? this.$to_date .pickadate('picker') : null;
	}
};

TransactionAllController.prototype.isHypeCard = function(card){
	return card['hype'] === true || card['hype'] === "true" ? true : false;
};

TransactionAllController.prototype.init = function() {
	this.initDatepickers();
    this.printCards = _.template($('#cardsTemplate').html());
};

TransactionAllController.prototype.cardDataTidy = function(callback) {
    var thisObj = this;
    if(this.cards != null) {
        _.each(this.cards ,function(card, idx, list) {
            card.meta = {};
            card.meta.circuitName = thisObj.isHypeCard(card) ? 'hype' : card.circuitName.toLowerCase();
            card.meta.cardAlias = card.cardAlias.toLowerCase();
            if(isNotEmpty(card.paymentMethodId)) {
            	card.meta.cardFilter = card.paymentMethodId; 
            	thisObj.filter.cards.status[card.meta.cardFilter] = false;
            }
        });
    }
    callback();
};

TransactionAllController.prototype.getCards = function() {
    var thisObj = this;
    var request_done = function(response) {
        thisObj.cards = response.data;
        thisObj.cardDataTidy(function(){
            var cardsHtml = thisObj.printCards({cards:thisObj.cards});
            if(thisObj.cards.length > 0) {
            	$('.small-cards').show();
            }
            $(".cards-small").html(cardsHtml);
        });
    };
    var config = {
        url: this.getCardsUrl
    },
    app_config = {
        scope:  thisObj, 
        done:   request_done
    };
	_.ajax(config, app_config);
};

TransactionAllController.prototype.stringSearch = function(text, token){
	var toRet = _.isString(text) && _.isString(token) ? text.indexOf(token) > -1 : false;
	return toRet;
};

TransactionAllController.prototype.filterPredicate = function(txn) {
    var toRet = txn ? true : false;
    var f = this.filter;

    var dateFilter = true;
    if(f.fromDate || f.toDate) {
        dateFilter = isNotEmpty(txn.meta.date);
        if(dateFilter) {
            var datetime = new Date(txn.meta.date).getTime();
            var isWithInFromDate = f.fromDate ? (f.fromDate <= datetime) : true;
            var isWithInToDate = f.toDate ? (datetime <= f.toDate ) : true;
            dateFilter = f.fromDate && f.toDate ? (isWithInFromDate && isWithInToDate) :
                        ( f.fromDate ? isWithInFromDate : ( f.toDate ? isWithInToDate : true ) ) ;
        }
    }

    var descriptionFilter = f.description ? this.stringSearch(txn.meta.description, f.description) : true;
    var beneficiaryFilter = f.beneficiary ? this.stringSearch(txn.meta.payedTo, f.beneficiary) : true;
    
    var statusFilter = f.txnStatus ? f.txnStatus === txn.meta.status : true ;

    var isCardFilterSet = f.cards['checkedAll'] || f.cards['checkedFew'];
    var payedCardFilter =  isCardFilterSet ? isNotEmpty(txn.meta.cardFilter) : true;
    if(payedCardFilter && isCardFilterSet)
    {
        var cardFilter = txn.meta.cardFilter;
        payedCardFilter =  _.some(f.cards.status, function(isCardChecked, cardProp){
             return isCardChecked && (cardProp === cardFilter);
        });
    }

    toRet = dateFilter && descriptionFilter && beneficiaryFilter && statusFilter && payedCardFilter;

    return toRet;
};

TransactionAllController.prototype.doFilter = function() {
    var thisObj = this;
    var filteredData = _.filter( this.transactions, function(txn){
        return thisObj.filterPredicate(txn);
    });
    this.loadTransactions(filteredData);
};

TransactionAllController.prototype.setEndTime = function(date) {
	var dateTime = null;
	if(date) {
		date.setHours(23);
		date.setMinutes(59);
		date.setSeconds(59);
		dateTime = date.setMilliseconds(999);
	}
	return dateTime;
};

TransactionAllController.prototype.isValidDate = function(dateString, allowFuture) {
    var toRet = false, thisObj = this;
    var tempDateArr = dateString.split('/');
    if(tempDateArr.length === 3) {
    	var today = new Date();
		var year = parseInt(tempDateArr[2]);
		if(!year || year < 1850) {
	          return false;
	    }
    	var tempArr = [tempDateArr[2], tempDateArr[1], tempDateArr[0]];
    	var formatedDateStr = tempArr.join('-'); // Converting to this format 'YYYY-MM-DD' to parse using Date object 
    	var dateInMilli = parseInt(Date.parse(formatedDateStr));
    	if(dateInMilli && dateInMilli > 0 ) {
			var date = new Date(dateInMilli);
			toRet = date && date.getMonth && ((date.getMonth() + 1) === parseInt(tempDateArr[1]));
    		if(toRet && !allowFuture) {
    			var todayInMilli = thisObj.setEndTime(today);
    			toRet = dateInMilli <= todayInMilli;
    		}
    	}
    }
    return toRet;
};

TransactionAllController.prototype.dateValidateHandler = function($this, $date_picker){
	var thisObj = this;
	var date = $this.val();
    if(date && up_common.dateRegEx.test(date) && thisObj.isValidDate(date)) {
    	$date_picker.set('select', date);
    	$this.parent().removeClass('input-error');
    } else {
    	$date_picker.clear();
    	if(date && date.length === 10) {
    		up_common.renderValidationError($this.parent(), $this.attr('name'), "Data non valida", null);
    	}
    }
};

var transactionsObj = new TransactionAllController();

$(function() {
    transactionsObj.init();
    transactionsObj.getTransactions();
    transactionsObj.getCards();

    $("#drawer-menu li, #nav-bar-menu li").has('a.purchase-log').attr("class", UPWEB_CONST_ACTIVE);

    /* Filter Handlers */
    /* Date Filter */
    var $from_date_picker = transactionsObj.$from_date_picker;
    var $to_date_picker = transactionsObj.$to_date_picker;
    
    $(document.body).on('keyup', '#from__datepicker', function(e){
    	var $this = $(this);
    	transactionsObj.dateValidateHandler($this, $from_date_picker);
    });
    $(document.body).on('keyup', '#to__datepicker', function(e){
    	var $this = $(this);
    	transactionsObj.dateValidateHandler($this, $to_date_picker);
    });
    
    if($from_date_picker) {
        $from_date_picker.on({
            open: function() {
            	$to_date_picker.close();
            	var from_date = $from_date_picker.get();
            	var to_date = $to_date_picker.get();
        		$from_date_picker.set('max', (to_date || true));
            	if(!(from_date)) {
            		$from_date_picker.set('highlight', (to_date || true));
            	}
            },
            set: function(thingSet) {
                if(thingSet && (thingSet.hasOwnProperty('select') || thingSet.hasOwnProperty('clear') )) {
                	if(thingSet['select']) {
                		var fromDate = thingSet.select; 
                		if(fromDate['indexOf'] && fromDate.indexOf('/') > -1) {
                			thingSet.select = $from_date_picker.get('select').pick;
                		} else {
                			$('.filters').find('#from__datepicker').val($from_date_picker.get());
                		}
                    }
                    transactionsObj.filter.fromDate = thingSet.select ? thingSet['select'] : null;
                    transactionsObj.doFilter();
                }
            }
        });
    }
    if($to_date_picker) {
        $to_date_picker.on({
            open: function() {
            	$from_date_picker.close();
            	var from_date = $from_date_picker.get();
            	var to_date = $to_date_picker.get();
            	$to_date_picker.set('min', (from_date || false));
            	$to_date_picker.set('max', true);
            	if(!(to_date)) {
            		$to_date_picker.set('highlight', (from_date || true));
            	}
            },
            set: function(thingSet) {
                if(thingSet && (thingSet.hasOwnProperty('select') || thingSet.hasOwnProperty('clear') )) {
                    var toDate = null;
                    if(thingSet.select) {
                		var toDate_ = thingSet.select; 
                		if(toDate_['indexOf'] && toDate_.indexOf('/') > -1) {
                			thingSet.select = $to_date_picker.get('select').pick;
                		} else {
                			$('.filters').find('#to__datepicker').val($to_date_picker.get());
                		}
                        toDate = new Date(thingSet['select']);
                        toDate = transactionsObj.setEndTime(toDate);
                    }

                    transactionsObj.filter.toDate = toDate;
                    transactionsObj.doFilter();
                }
             }
        });
    }

    var filterByInput = function($elm, property) {
	    var input = ($elm && $elm.val) ? $elm.val() : null;
	    transactionsObj.filter[property] = _.isString(input) && input.trim().length ? input.toLowerCase() : null;
        transactionsObj.doFilter();
	};
	
    /* Description Filter */
    $(document.body).on('keyup', 'input#description-filter', function(e) {
        filterByInput($(this), 'description');
    });

    /* Description Filter */
    $(document.body).on('keyup', 'input#beneficiary-filter', function(e) {
        filterByInput($(this), 'beneficiary');
    });

    /* Status Filter */
    $(document.body).on('click', 'input[name="state"]', function(e) {
        var $this = $(this);
        if($this.prop( "checked" )) {
            transactionsObj.filter.txnStatus = transactionsObj.TXN_STATUS_LIST[$this.attr('id')];
            transactionsObj.doFilter();
        }
    });

    /* Card Type Filter */
    $(document.body).on('click', '.card-small', function(e){
    	var $this = $(this);
    	var cardFilter = $this.data( "cardFilter" );
        var checkedStatus = $this.find('.card .check-box').hasClass('checked');
        
        var status = transactionsObj.filter.cards.status;
        var flag = isNotEmpty(cardFilter) &&  status.hasOwnProperty(cardFilter) ? checkedStatus : false;
        status[cardFilter] = flag;

        var checkedFew = flag || _.some(status);
        var checkedAll = flag && _.every(status);
        
        $('#check-all').prop("checked", checkedAll);
        transactionsObj.filter.cards.checkedFew = checkedFew;
        transactionsObj.filter.cards.checkedAll = checkedAll;
        transactionsObj.filter.cards.status = status;

        transactionsObj.doFilter();
    });

    $(document.body).on('click', '#check-all', function(){
        var checkedAll = $(this).prop("checked");
        var status = transactionsObj.filter.cards.status;
        _.each(status, function(isCardChecked, cardProp, list){
            this[cardProp] = checkedAll;
        }, status);

        transactionsObj.filter.cards.status = status;
        transactionsObj.filter.cards.checkedFew = checkedAll;
        transactionsObj.filter.cards.checkedAll = checkedAll;
        transactionsObj.doFilter();
    });

    /* Pagination*/
    $(document.body).on('click', '.paging a', function(e){
        var $this = $(this);
        var $thisParent = $this.parent('.disabled, .current');
        if($thisParent.length > 0) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        var state = $this.data('state');
        var paging = transactionsObj.pagination;
        var data = [];

        switch(state) {
            case 'prev':
                data = paging.getPreviousPage();
                break;
            case 'next':
                data = paging.getNextPage();
                break;
            default:
                if(_.isFinite(state)) {
                    data = paging.getPage(state);
                }
        }
        if(data.length) {
            transactionsObj.renderTransactions(data);
        }
    });
});
