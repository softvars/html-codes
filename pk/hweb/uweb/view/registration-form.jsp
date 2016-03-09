<div class="container form-content" id="modal-preregister-user">
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
				<form class="registration-user-form registration-new-user-form"
					id="registration-user-form" action="#registerUser" method="POST">
					<fieldset>
						<label for="name">nome</label>
						<div class="input-group">
							<input type="text" name="firstName" id="name"
								placeholder="Nome" class="text-input" />
							<span class="input-group-btn"> <span
								class="input-group-addon"></span>
							</span>
							<div class="input-msg"></div>
						</div>
					</fieldset>
					<fieldset>
						<label for="surname">cognome</label>
						<div class="input-group">
							<input type="text" name="lastName" id="surname"
								placeholder="Cognome" class="text-input" />
							<span class="input-group-btn"> <span
								class="input-group-addon"></span>
							</span>
							<div class="input-msg"></div>
						</div>
					</fieldset>
					<fieldset>
						<label for="email">email</label>
						<div class="input-group-block">
							<input type="text" name="email" id="email"
								placeholder="latuaemail@email.it" class="readonly" readonly
								value="${userProfilePV.email}" /> <span class="input-group-btn">
							</span>
							<div class="input-msg"></div>
						</div>
					</fieldset>
					<fieldset>
						<label for="countrycode">numero di telefono</label>
						<div class="input-group">
							<div class="col-xs-3 less-padding-right padding-left-zero">
								<p class="input-group-block">
								<input type="text" name="countryCode" id="countryCode"
									value="+39" class="text-input border-rght"
									placeholder="Inserisci qui il tuo numero di telefono..." />
								</p>
							</div>
							<div class="col-xs-9 less-padding-left padding-right-zero">
							<p class="input-group">
							 <input type="text" name="mobileNumber" id="phone"
								placeholder="Cellulare"
								class="text-input" /> <span class="input-group-btn"> <span
								class="input-group-addon"></span>
							</span>
							</p>
							</div>
							<div class="input-msg"></div>
						</div>
					</fieldset>
					<fieldset>
						<label for="edit-date">data di nascita</label>
						<div class="input-group birthdate">
							<input type="text" placeholder="GG/MM/AAAA" name="birthDate"
								id="edit-date" picker-bind="birthDate__datepicker" />
								<span class="input-group-btn"> <span
								class="input-group-addon"></span>
							</span>
							<div class="input-msg"></div>
						</div>
					</fieldset>
					<fieldset class="variable-field">
						<label for="password">password</label>
						<div class="input-group">
	   					    <input type="text" name="fake_password" placeholder="Password" class="text-input fake_password" autocomplete="off"/>
							<input type="password" name="password" id="password" class="text-input hide-it" autocomplete="off"/> 
							<span class="input-group-btn"> 
							   <span class="input-group-addon"></span>
							</span>
							<div class="input-msg"></div>
						</div>
					</fieldset>
					<fieldset class="variable-field">
						<label for="confirm-password">conferma password</label>
						<div class="input-group">
							<input type="text" name="fake_password" placeholder="Ripeti password" class="text-input fake_password" autocomplete="off"/> 
							<input type="password" name="confirmPassword" id="confirm-password" class="text-input hide-it" autocomplete="off"/>
								<span class="input-group-btn"> 
								    <span class="input-group-addon"></span>
							    </span>
							<div class="input-msg"></div>
						</div>
					</fieldset>
					<fieldset class="variable-field">
						<label for="quest1">domanda di sicurezza n&deg;1</label>
						<div class="input-group-block security-question">
							<select name="securityQuestionOne" id="quest1"
								class="selectpicker">
								<option value="default">Scegli una domanda di sicurezza</option>
								<c:forEach items="${securityQuestions}" var="securityQuetion">
									<option value="${securityQuetion.code}">${securityQuetion.question}</option>
								</c:forEach>
							</select>
							<div class="input-msg"></div>
						</div>
					</fieldset>
					<fieldset class="variable-field">
						<label for="ans1">risposta domanda n&deg;1</label>
						<div class="input-group">
							<input type="text" name="securityAnswerOne" id="ans1"
								placeholder="inserisci la risposta alla domanda N&deg;1"
								class="text-input" /> <span class="input-group-btn"> <span
								class="input-group-addon"></span>
							</span>
							<div class="input-msg"></div>
						</div>
					</fieldset>
					<fieldset class="variable-field">
						<label for="quest2">domanda di sicurezza n&deg;2</label>
						<div class="input-group-block security-question">
							<select name="securityQuestionTwo" id="quest2"
								class="selectpicker">
								<option value="default">Scegli una domanda di sicurezza</option>
								<c:forEach items="${securityQuestions}" var="securityQuetion">
									<option value="${securityQuetion.code}">${securityQuetion.question}</option>
								</c:forEach>
							</select>
							<div class="input-msg"></div>
						</div>
					</fieldset>
					<fieldset class="variable-field">
						<label for="ans2">risposta domanda n&deg;2</label>
						<div class="input-group">
							<input type="text" name="securityAnswerTwo" id="ans2"
								placeholder="inserisci la risposta alla domanda N&deg;2"
								class="text-input" /> <span class="input-group-btn"> <span
								class="input-group-addon"></span>
							</span>
							<div class="input-msg"></div>
						</div>
					</fieldset>
					<div class="row">
						<div class="col-xs-12 less-padding-right">
							<div class="checkbox reg">
								<input id="termsAndCondition" type="checkbox"
									name="termsAndCondition"> <label
									for="termsAndCondition" id="termsAndConditionLabel"
									class="checkbox reg">ACCETTO I <a
									href="#termini_e_condizioni" id="termsAndConditionModal"> <span>TERMINI
											DI UTILIZZO E LE CONDIZIONI SULLA
											PRIVACY </span></a></label>
							</div>
						</div>
					</div>
					<fieldset>
						<input type="submit" class="readonly" name="send" value="CONTINUA"
							id="registration-user-btn" disabled />
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</div>