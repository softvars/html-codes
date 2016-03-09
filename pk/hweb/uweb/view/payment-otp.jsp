
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<tiles:insertDefinition name="paymentlayout">

<tiles:putAttribute name="title">
	Hype Wallet Web - Payment User Cards
</tiles:putAttribute>
	
<tiles:putAttribute name="javascript">
    <script type="text/javascript" src="<c:url value="/resources/js/controller/payment-otp.js"/>"></script>
</tiles:putAttribute>
<tiles:putAttribute name="css">
    <link  rel="stylesheet" type="text/css" href="<c:url value="/resources/css/payment.css" />">
</tiles:putAttribute>

<tiles:putAttribute name="body">
    <div id="cards-body-container" data-txnid="${paymentTrxId}">
        <div class="row">
            <div class="col-md-12">
                <div class="personal-data-panel">
                    <div class="container-fluid min_height">
                        <div class="row head">
                            <div class="col-md-12 logo-wrap">
                                <div class="logo"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="divider"></div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
                       <div class="row">
					<div class="col-sm-12">
						<div class="head">Conferma OTP</div>
						<div class="error-message"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<form method="POST" class="address-form confirm-token-form" id="token-validation-form"  action="#validateTokens">
							<fieldset>
								<div>
									<label for="pinsms">CODICE SMS</label>
									<a id="resend-sms-otp" href="#" class="resend">reinvia sms</a>
								</div>
								<p>
									Inserisci il codice che hai ricevuto via SMS al tuo numero di
									cellulare <strong>${mobile_number}</strong>.
								</p>
								<div class="input-group">
									<input type="text" class="text-input" name="smsOTP" id="pinsms"
										placeholder="ex 123456" /> <span class="input-group-btn">
										<span class="input-group-addon"></span>
									</span>
									<div class="input-msg"></div>
								</div>
							</fieldset>
							<fieldset>
							    <input type="hidden" name="paymentTrxId" style="display:none;" value="${paymentTrxId}"/>
								<input type="submit" name="send" value="CONFERMA" id="token-validation-btn" />
								<div class="bottom-text chances-left hide-it">
									Tentativi rimasti:&nbsp;<span>3</span>
								</div>
							</fieldset>
						</form>
					</div>
                    <div class="select-card">
                        <fieldset>
                            <div class="cancel">
                                <span>Annulla</span>
                            </div>
                        </fieldset>
                    </div>
				</div>
				</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</tiles:putAttribute>
<tiles:putAttribute name="footer">
    <div class="sticky-footer">
        <div class="col-sm-12">
            <div class="copyright">
                <span>&#169; HYPE WALLET - Gruppo Banca Sella</span>
                <span class="dot hidden-xs"> &#183; </span>
           		 <span class="terms">
                	<a href="/upweb/termsandprivacy" target="_blank" title="Privacy Policy">Privacy Policy</a>
            	</span>
            </div>
        </div>
    </div>
</tiles:putAttribute>
</tiles:insertDefinition>
        

    