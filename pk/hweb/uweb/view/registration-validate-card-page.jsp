<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<tiles:insertDefinition name="registrationlayout">
	<tiles:putAttribute name="title">
	Hype Wallet - Inserisci carta  
</tiles:putAttribute>
	<tiles:putAttribute name="javascript">
		<script type="text/javascript" src="<c:url value="/resources/js/controller/validatecard.js"/>"></script>
	</tiles:putAttribute>
	<tiles:putAttribute name="body">
		<div class="container form-content" id="modal-validate-card">
			<div class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
				<div class="row">
					<div class="col-sm-12 logo-wrap">
						<div class="logo"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<div class="head long-title">Inserisci una carta di credito valida</div>
						<div class="sub-head">Compila tutti i campi sottostanti</div>
						<div class="error-message"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<form method="POST" class="registration-card-form" action="#" id="card-validate-form" autocomplete="off">
							<c:if test = "${message ne null }">
						<div class="row formAlert alert alert-dismissable alert-danger" role="alert"><div class="col-sm-12">
						<button type="button" class="close close-alert" data-dismiss="alert" alert-id="#msg-alert" aria-label="Close"></button>
						<span class="message">${message}</span></div></div></c:if>
							<fieldset>
								<label for="card-code">carta di credito</label>
								<div class="input-group">
									<input type="text" name="pan" id="card-code" placeholder="Numero carta di credito" class="text-input" />
									<span class="input-group-btn cards">
										<span class="input-group-addon no-border-right"></span>
										<span class="input-group-addon"></span>
									</span>
									<div class="input-msg">Messaggio di errore</div>
								</div>
							</fieldset>
							<div class="row">
								<div class="col-xs-6 less-padding-right">
									<fieldset>
										<label for="expiry-date">scadenza</label>
										<div class="input-group">
											<input type="text" name="expiryDate" id="expiry-date" placeholder="MM / AA" class="text-input expiry-date" />
											<span class="input-group-btn">
												<span class="input-group-addon"></span>
											</span>
											<div class="input-msg">Messaggio di errore</div>
										</div>
									</fieldset>
								</div>
								<div class="col-xs-6 less-padding-left">
									<fieldset>
										<label for="cvc-code">cvc</label>
										<div class="input-group info-black">
											<input type="text" name="fake_password" placeholder="CVV/CVC" class="text-input cvc-code fake_password" autocomplete="off"/>
											<input type="password" name="cvv" class="text-input cvc-code hide-it" id="cvc-code"  autocomplete="off" />
											<span class="input-group-btn">
												<span class="input-group-addon cvc-popover" id="cvc-popover"></span>
											</span>
											<div class="input-msg">Messaggio di errore</div>
										</div>
									</fieldset>
								</div>
							</div>
							<fieldset>
				    			<label for="alias">alias carta</label>
				    			<div class="input-group">
									<input type="text" name="cardAlias" id="alias" placeholder="Nome carta di credito" class="text-input" />
									<span class="input-group-btn">
										<span class="input-group-addon"></span>
									</span>
									<div class="input-msg">Messaggio di errore</div>
								</div>
				    		</fieldset>
				    		<input type="hidden" id="circuitName" class="readonly" name="circuitName" value="" />
							<fieldset>
								<input type="submit" name="send" value="REGISTRAMI" id="card-validate-btn"  />
								<div class="bottom-text chances-left <c:if test='${retryCount  == 3}'>hide_it</c:if>">
									Tentativi rimasti:&nbsp;<span>${retryCount}</span>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	</tiles:putAttribute>
</tiles:insertDefinition>