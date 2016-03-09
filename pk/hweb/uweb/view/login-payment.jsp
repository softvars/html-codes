<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<tiles:insertDefinition name="loginlayout">
    <tiles:putAttribute name="title"> HYPE WALLET - Accesso </tiles:putAttribute>
    <tiles:putAttribute name="css">
      <style type="text/css">
        .select-card.cancel{
            text-align: center;
            padding: 20px 0;
        }
        .select-card.cancel span{
            color: #0c303c;
            font-size: 14px;
            cursor: pointer;
            font-weight: bold;
        }

        .select-card.cancel span:hover{ border-bottom: 2px solid #30b093; }
        .confirm-modal .popover.payment-flow .popover-title {text-transform: uppercase;}
        .confirm-modal .popover.payment-flow .popover-actions div.positive {background-color: #e9474e;}
        .confirm-modal .popover.payment-flow .popover-actions div.positive:hover {background-color: #b7424b;}
        
        .form-container, .checkout, .checkout-in-progress, .checkout-done {
            min-height: 99%;
        }
        .confirm-modal#payment-cancel-alert { left: 0; }
      </style>
    </tiles:putAttribute>
    <tiles:putAttribute name="javascript">
      <script type="text/javascript" src="<c:url value="/resources/js/controller/login-payment.js"/>"></script>
      <script type="text/javascript">
        var loginPayment_paymentTrxId = "${paymentTrxId}";
        
        var showPaymentCancelAlert = function() {
            $('#payment-cancel-alert').removeClass('hide-it').show();
        };
        
        $(function() {
        	
            $(document.body).off('click', ".payment-flow .negative:has(a), .payment-flow .positive:has(a)");
            $(document.body).on('click', ".payment-flow .negative:has(a), .payment-flow .positive:has(a)", function(e){
            	if(e.target && e.target.tagName != 'A') {
            	    $(".payment-flow .negative:has(a), .payment-flow .positive:has(a)").off('click');
            	    $('a', $(this)).click();
            	    window.location.href = $(this).find("a").first().attr("href");
            	    e.stopPropagation();
            	    e.preventDefault();
            	    return false;
            	}
            });
            
            $(document.body).off('click', '#cancel-payment-cardselection a');
            $(document.body).on('click', '#cancel-payment-cardselection a', function(e){
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
            
            $(document.body).off('click', '.select-card.cancel span');
            $(document.body).on('click', '.select-card.cancel span', function(e) {
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
    </tiles:putAttribute>
    <tiles:putAttribute name="body">
        <div class="container">
                <div class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
                    <div class="row">
                        <div class="col-sm-12 logo-wrap">
                            <div class="logo"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="head">Accedi a HYPE WALLET</div>
                            <div class="sub-head">Inserisci i tuoi codici di accesso</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <form method="POST" class="login-form" action="/AuthenticationDelegatedServlet" name="form_autenticazione" id="form_autenticazione">
                              <input type="hidden" name="delegated_service" value="269" style="display:none;" form="form_autenticazione" />
                              <input type="hidden" name="AU_HypeWalletSectionName" value="PAYMENT" style="display:none;" form="form_autenticazione" />
                              <input type="hidden" name="paymentTrxId" value="${paymentTrxId}" style="display:none;" form="form_autenticazione" />
                                <fieldset>
                                    <label for="user-code">Email</label>
                                    <div class="input-group">
                                        <input type="text" name="UserId" id="UserId" placeholder="latuaemail@email.it" class="text-input" />
                                        <span class="input-group-btn">
                                            <span class="input-group-addon"></span>
                                        </span>
                                        <div class="input-msg">Il codice utente inserito non &#232; corretto</div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <label for="password">password</label>
                                    <div class="input-group">
                                        <input type="text" name="fake_password" placeholder="Password" class="text-input fake_password" autocomplete="off"/>
										<input type="password" name="Password" id="Password" class="text-input hide-it" autocomplete="off"/>
                                        <span class="input-group-btn">
                                            <span class="input-group-addon"></span>
                                        </span>
                                        <div class="input-msg"></div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <input type="submit" name="send" value="ACCEDI" />
                                    <div class="select-card cancel">
                                        <span>Annulla</span>
                                    </div>
                                </fieldset>
                            </form>
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
			            <div class="positive col-xs-6" id=cancel-payment-cardselection>
			                <a href="/upweb/payment/cancelcard?paymentTrxId=${paymentTrxId}&secrandid=${secrandid}">SI</a>
			            </div>
			        </div>
			    </div>
			</div>
    </tiles:putAttribute>
</tiles:insertDefinition>