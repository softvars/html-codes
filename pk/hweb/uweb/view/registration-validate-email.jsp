<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<tiles:insertDefinition name="registrationlayout">
	<tiles:putAttribute name="title">
	Hype Wallet - Registrati subito
</tiles:putAttribute>
	<tiles:putAttribute name="javascript">
		<script type="text/javascript" src="<c:url value="/resources/js/controller/preregistration.js"/>"></script>
		<script type="text/javascript">
			var userProfile = '${userProfilePV}';
		</script>
	</tiles:putAttribute>
	<tiles:putAttribute name="body">
		<div class="container form-content" id="modal-validate-user">
			<div
				class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
				<div class="row">
					<div class="col-sm-12 logo-wrap">
						<div class="logo"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<div class="head">Registrati subito</div>
						<div class="sub-head">Compila tutti i campi sottostanti</div>
						<div class="error-message"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<form class="registration-user-form" id="validate-user-form" method="POST">
							<fieldset>
								<label for="email">email</label>
								<div class="input-group">
									<input type="text" name="email" id="email"
										placeholder="latuaemail@email.it" class="text-input" /> <span
										class="input-group-btn"> <span
										class="input-group-addon"></span>
									</span>
									<div class="input-msg"></div>
								</div>
							</fieldset>
							<br />
							<div class="captchaimg">
								<img alt="captcha image" src="/upweb/request/captcha/img" id="captcha-image" />
							</div>
							<div class="row captcha-link">
								<div class="col-xs-6">
									<a href="#" class="refresh-captcha">refresh immagine
										captcha</a>
								</div>
								<div class="col-xs-6 text-right hide_it">
									<a href="#" class="read-text">leggi il testo</a>
								</div>
							</div>
							<fieldset>
								<label for="textcaptcha">testo captcha</label>
								<div class="input-group">
									<input type="text" class="text-input" name="captcha"
										id="textcaptcha" placeholder="ex ABCDE" /> <span
										class="input-group-btn"> <span
										class="input-group-addon"></span>
									</span>
									<div class="input-msg"></div>
								</div>
							</fieldset>
							<fieldset>
								<input type="submit" name="send" value="CONTINUA"
									id="validate-user-btn"  />
							</fieldset>
						</form>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<div class="form-footer">Sei gi&#224; registrato? <a href="/upweb/login.html?secrandid=${secrandid}"
								title="Sei gi&agrave; registrato?">Accedi ora</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<c:if test='${upweb_user ne null}'>
		<div class="confirm-modal" id="registered-upweb-user-alert">
		<div class="popover hype-wallet-alert registered-user">
			<div class="popover-title">
				<span>Hai gi&agrave; un profilo HYPE WALLET</span>
			</div>
			<div class="popover-content">
				<span>Sei gi&agrave; registrato su HYPE WALLET.<br /> Per effettuare l'accesso al tuo profilo premi Login.</span>
			</div>
			<div class="popover-actions row">
				<div class="negative col-xs-6" id="close-registered-upweb-alert">CHIUDI</div>
				<div class="positive col-xs-6" id="show-upweb-login">
					<a href="#" >LOGIN</a>
				</div>
			</div>
		</div>
	</div>
	</c:if>
	<c:if test='${authenticated_user ne null}'>
	<div class="confirm-modal" id="registered-hype-user-alert">
		<div class="popover hype-wallet-alert registered-user">
			<div class="popover-title">
				<span>HAI GI&Agrave; UN ACCOUNT HYPE</span>
			</div>
			<div class="popover-content">
				<span>Sei gi&agrave; registrato su HYPE.<br /> Per effettuare l'accesso al tuo profilo premi Login.</span>
			</div>
			<div class="popover-actions row">
				<div class="negative col-xs-6" id="close-registered-hype-alert">CHIUDI</div>
				<div class="positive col-xs-6" id="show-hype-login">
					<a href="#" >LOGIN</a>
				</div>
			</div>
		</div>
	</div>
	</c:if>
	
		</tiles:putAttribute>
</tiles:insertDefinition>