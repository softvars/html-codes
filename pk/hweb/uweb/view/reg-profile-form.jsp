<div class="container" id="modal-preregister-user">
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
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<form class="registration-user-form" id="registration-user-form"
							action="#registerUser" method="POST">
							<fieldset>
								<label for="name">nome</label>
								<div class="input-group">
									<input type="text" name="firstName" id="name" readonly
										placeholder="Inserisci qui il tuo nome..." class="readonly"
										value="${userProfile.firstName}" /> <span
										class="input-group-btn"> <span
										class="input-group-addon"></span>
									</span>
									<div class="input-msg">Messaggio di errore</div>
								</div>
							</fieldset>
							<fieldset>
								<label for="surname">cognome</label>
								<div class="input-group">
									<input type="text" name="lastName" id="surname" readonly
										value="${userProfile.lastName}" class="readonly"
										placeholder="Inserisci qui il tuo cognome..."
										class="text-input" /> <span class="input-group-btn"> <span
										class="input-group-addon"></span>
									</span>
									<div class="input-msg">Messaggio di errore</div>
								</div>
							</fieldset>
							<fieldset>
								<label for="email">email</label>
								<div class="input-group">
									<input type="text" name="email" id="email" readonly class="readonly"
										value="${userProfile.email}" placeholder="latuaemail@email.it"
										class="text-input" /> <span class="input-group-btn"> <span
										class="input-group-addon"></span>
									</span>
									<div class="input-msg">Messaggio di errore</div>
								</div>
							</fieldset>
							<fieldset>
								<label for="phone">numero di telefono</label>
								<div class="input-group">
									<input type="text" name="mobileNumber" id="phone" readonly
										value="${userProfile.mobileNumber}" class="readonly"
										placeholder="Inserisci qui il tuo numero di telefono..."
										class="text-input" /> <span class="input-group-btn"> <span
										class="input-group-addon"></span>
									</span>
									<div class="input-msg">Messaggio di errore</div>
								</div>
							</fieldset>
							<fieldset>
								<label for="cf">codice fiscale</label>
								<div class="input-group">
									<input type="text" name="taxCode" id="cf" readonly
										value="${userProfile.taxCode}" placeholder="Inserisci qui il tuo codice fiscale..."
										class="text-input readonly edit_codice_fiscale" /> <span class="input-group-btn"> <span
										class="input-group-addon"></span>
									</span>
									<div class="input-msg"></div>
								</div>
							</fieldset>
							<fieldset>
								<input type="submit" class="readonly" name="send" value="CONTINUA"
									id="registration-user-btn" />
							</fieldset>
						</form>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<div class="form-footer">
							Sei gi&agrave; registrato? <a href="login.html"
								title="Sei gi&agrave; registrato?">Accedi ora</a>
						</div>
					</div>
				</div>
			</div>
		</div>