<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<tiles:insertDefinition name="registrationlayout">
	<tiles:putAttribute name="title">
	Hype Wallet - Recupero Password
</tiles:putAttribute>
	<tiles:putAttribute name="javascript">
		<script type="text/javascript" src="<c:url value="/resources/js/controller/forgetpass-email-validate.js"/>"></script>
	</tiles:putAttribute>
	<tiles:putAttribute name="body">
		<div class="container form-content" id="modal-validate-user">
			<div class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
				<div class="row">
					<div class="col-sm-12 logo-wrap">
						<div class="logo"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<div class="head">Recupero Password</div>
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
								<img alt="captcha image" src="/upweb/request/captcha/img?secrandid=${secrandid}" id="captcha-image" />
							</div>
							<div class="row captcha-link">
								<div class="col-xs-6">
									<a href="#" class="refresh-captcha">refresh immagine captcha</a>
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
								<input type="submit" name="send" value="CONTINUA" id="validate-user-cap-btn"  />
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
		</tiles:putAttribute>
</tiles:insertDefinition>