<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<tiles:insertDefinition name="registrationlayout">
	<tiles:putAttribute name="title">
	Hype Wallet - Verifica OTP
</tiles:putAttribute>
	<tiles:putAttribute name="javascript">
		<script type="text/javascript" src="<c:url value="/resources/js/controller/forgetpass-validate-tokens.js"/>"></script>
	</tiles:putAttribute>
	<tiles:putAttribute name="body">
		<div class="container form-content" id="modal-token-validation">
			<div class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
				<div class="row">
					<div class="col-sm-12 logo-wrap">
						<div class="logo"></div>
					</div>
				</div>
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
									cellulare <strong>${userProfilePV.countryCode} ${userProfilePV.mobileNumber}</strong>.
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
								<div>
									<label for="pinemail">CODICE email</label> 
									<a id="resend-email-otp" href="#" class="resend">reinvia email</a>
								</div>
								<p>
									Inserisci il codice che hai ricevuto via EMAIL al tuo indirizzo
									email <strong>${userProfilePV.email}</strong>.
								</p>
								<div class="input-group">
									<input type="text" class="text-input" name="emailOTP"
										id="pinemail" placeholder="ex AB1C2DE3" /> <span
										class="input-group-btn"> <span
										class="input-group-addon"></span>
									</span>
									<div class="input-msg">Messaggio di errore</div>
								</div>
							</fieldset>
							<fieldset>
								<input type="submit" name="send" value="CONFERMA" id="token-validation-btn" />
								<div class="bottom-text chances-left hide-it">
									Tentativi rimasti:&nbsp;<span>3</span>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	</tiles:putAttribute>
</tiles:insertDefinition>