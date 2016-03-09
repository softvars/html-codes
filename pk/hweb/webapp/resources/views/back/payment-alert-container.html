<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>

<%!
    static final Map<String, String> msgMap = new HashMap<String, String>();
%>
<%
    msgMap.put("CARD_LIST_EMPTY",  "Al momento non &#232; possibile procedere con il pagamento. Non hai nessuna carta associata al tuo profilo HYPE WALLET.");
    msgMap.put("OTP_FAILED",       "Al momento non &#232; possibile procedere con il pagamento. Ruggiunto il limite massimo di tentativi.");
    msgMap.put("PAYMENT_CANCELED", "Sei sicuro di voler abbandonare il pagamento con HYPE WALLET?");
    String msgType = (String) request.getAttribute("message_type");
    String message = msgType != null  ? msgMap.get(msgType) : "" ;
%>
<div class="confirm-modal hide-it" id="payment-cardselection-alert">
    <div class="popover hype-wallet-alert button-middle payment-flow">
        <div class="popover-title">
            <span>Pagamento non possibile</span>
        </div>
        <div class="popover-content">
            <span class="1"><%= message %></span>
        </div>
        <div class="popover-actions row">
            <div class="positive col-xs-6" id="close-payment-cardselection">
                <a href="/upweb/auth/payment/cardselection?paymentTrxId=${paymentTrxId}&secrandid=${secrandid}">OK</a>
            </div>
        </div>
    </div>
</div>
<div class="confirm-modal hide-it" id="payment-cancel-alert">
    <div class="popover hype-wallet-alert payment-flow payment-cancel">
        <div class="popover-title">
            <span>Attenzione</span>
        </div>
        <div class="popover-content">
            <span class="1">Sei sicuro di voler abbandonare il pagamento con HYPE WALLET?</span>
        </div>
        <div class="popover-actions row">
            <div class="negative col-xs-6" id="close-hype-wallet-alert">NO</div>
            <div class="positive col-xs-6" id="cancel-payment-cardselection">
                <a href="/upweb/auth/payment/cancelcard?paymentTrxId=${paymentTrxId}&secrandid=${secrandid}">SI</a>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
	if(typeof up_common !== "undefined") {
	    up_common.isSupportedBrowser = true;
	}

    var payment_Url = "/upweb/auth/payment/cancelcard?paymentTrxId=${paymentTrxId}&secrandid=${secrandid}";
    var cancel_Card_Url =  "/upweb/auth/payment/cardselection?paymentTrxId=${paymentTrxId}&secrandid=${secrandid}";

    var msgMap = {};
    msgMap["CARD_LIST_EMPTY"]   = "<%= msgMap.get("CARD_LIST_EMPTY") %>";
    msgMap["OTP_FAILED"]        = "<%= msgMap.get("OTP_FAILED") %>";
    msgMap["PAYMENT_CANCELED"]  = "<%= msgMap.get("PAYMENT_CANCELED") %>";// needs to move to html itself
    
	var showPaymentCardselectionAlert = function() {
		$(".transaction-info").addClass("hide");
	    $('#payment-cardselection-alert').removeClass('hide-it').show();
	};

    var showPaymentCancelAlert = function() {
        $('#payment-cancel-alert').removeClass('hide-it').show();
    };

    var setPaymentMessageAlert = function(msgType) {
    	if(msgType && msgMap[msgType]) {
    	    $("#payment-cardselection-alert .popover-content span").html(msgMap[msgType]);
    	}
    };
    
	var isCardListEmpty = '${is_card_list_empty}';
	if(isCardListEmpty === 'true') {
		setPaymentMessageAlert("CARD_LIST_EMPTY");
		showPaymentCardselectionAlert();
	}
	
	$(function() {
        $(document.body).off('click', ".payment-flow .negative:has(a), .payment-flow .positive:has(a)");
        $(document.body).on('click', ".payment-flow .negative:has(a), .payment-flow .positive:has(a)", function(e){
            if(e.target && e.target.tagName != 'A') {
                //$(".payment-flow .negative:has(a), .payment-flow .positive:has(a)").off('click');
                var $this = $(this);
                $this.off('click');
                $('a', $this).click();
                window.location.href = $this.find("a").first().attr("href");
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
        });
        
        $(document.body).off('click', '#close-payment-cardselection a, #cancel-payment-cardselection a');
        $(document.body).on('click', '#close-payment-cardselection a, #cancel-payment-cardselection a', function(e){
            //$(document.body).on('click', '#close-payment-cardselection a, #cancel-payment-cardselection a', function(e){
            $(this).on('click', function(e){
                $(this).off('click');
				e.stopPropagation();
		        e.preventDefault();
		        return false;
			});
			$('.confirm-modal').addClass('hide-it');
			if(typeof up_common !== "undefined") {
				  up_common.spinnerOverlay(true);
			}
		});
		
		$(document.body).off('click', '.select-card .cancel span');
		$(document.body).on('click', '.select-card .cancel span', function(e) {
	        showPaymentCancelAlert();
            e.stopPropagation();
            e.preventDefault();
            return false;
	    });
		
		$(document.body).on('click', "#close-hype-wallet-alert", function(e){
 	    	$(".confirm-modal").addClass('hide-it').hide();
		});
	});
</script>