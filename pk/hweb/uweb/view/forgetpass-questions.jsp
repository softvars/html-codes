<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<tiles:insertDefinition name="registrationlayout">
	<tiles:putAttribute name="title">
	Hype Wallet - Cambio Password
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
						<div class="head">Cambio Password</div>
						<div class="error-message"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<form method="POST" class="address-form" id="unblock-pin-form" action="#validateTokens">
							<fieldset>
								<label class="label-no-case" for="ansOne">${questionOne.question}</label>
								<div class="input-group">
									<input type="text" class="text-input" name="answerOne" id="ansOne"
										placeholder="inserisci la risposta alla domanda" /> <span class="input-group-btn">
										<span class="input-group-addon"></span>
									</span>
									<div class="input-msg"></div>
								</div>
							</fieldset>
							<fieldset>
								<label class="label-no-case" for="ansTwo">${questionTwo.question}</label>
								<div class="input-group">
									<input type="text" class="text-input" name="answerTwo"
										id="ansTwo" placeholder="inserisci la risposta alla domanda" /> <span
										class="input-group-btn"> <span
										class="input-group-addon"></span>
									</span>
									<div class="input-msg"></div>
								</div>
							</fieldset>
							<fieldset>
								<label for="newPassword">Nuova Password</label> 
								<div class="input-group">
									<input type="text" name="fake_password" placeholder="Password" class="text-input fake_password" autocomplete="off"/>
									<input type="password" name="password" id="password" class="text-input hide-it" autocomplete="off"/>
									<span class="input-group-btn"> 
										<span class="input-group-addon"></span>
									</span>
									<div class="input-msg"></div>
								</div>
							</fieldset>
							<fieldset>
								<label for="confirmPassword">Confermare Nuova Password</label> 
								<div class="input-group">
									<input type="text" name="fake_password" placeholder="Ripeti password" class="text-input fake_password" autocomplete="off"/> 
									<input type="password" name="confirmPassword" id="confirm-password" class="text-input hide-it" autocomplete="off"/>
									<span class="input-group-btn"> 
										<span class="input-group-addon"></span>
									</span>
									<div class="input-msg"></div>
								</div>
							</fieldset>
							<fieldset>
								<input type="submit" name="send" value="CONFERMA" id="unblock-pin-btn" />
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
		<div class="confirm-modal hide-it" style="display:none" id="password-reset-success">
			        <div class="popover hype-wallet-alert button-middle registered-user">
			            <div class="popover-title">
			                <span>Password modificata con successo</span>
			            </div>
			            <div class="popover-content">
			                <span>Per effettuare l'accesso al tuo profilo premi Login.</span>
			            </div>
			            <div class="popover-actions row">
			                <div class="positive col-xs-6">
			                    <a href="#" id="go-to-login">LOGIN</a>
			                </div>
			            </div>
			        </div>
			    </div>
	</tiles:putAttribute>
</tiles:insertDefinition>