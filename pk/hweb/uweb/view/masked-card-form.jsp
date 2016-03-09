<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="container form-content" id="modal-validate-card">
	<div
		class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
		<div class="row">
			<div class="col-sm-12 logo-wrap">
				<div class="logo"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<div class="head long-title">Conferma carta</div>
				<div class="card sub-head">Utilizzi gi&agrave; l'applicazione Hype Wallet.</div>
				<div class="card sub-head">Scegli una delle tue carte e inserisci le
					cifre mancanti per confermare la tua registrazione</div>
				<div class="error-message"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<form method="POST" class="address-form confirm-card-form" action=""
					id="confirm-maskedpan-form">
					<div class="row">
						<fieldset>
							<label for="quest2">Scegli una carta</label>
							<div class="input-group input-group-block">
								<select name="cardAlias" id="card-alias" class="selectpicker">
									<c:forEach items="${maskedCardsForVerification}" var="card">
												<option value="${card.key}">${card.value.cardAlias}</option>
											</c:forEach>
								</select>
							</div>
						</fieldset>
					</div>
					<div class="credit-card">
						<div class="flip-container" id="card-container-1">
							<div class="flipper">
								<div class="card-plate front">
									<div class="top">
										<div class="chip"></div>
										<div class="type">
											<div class="card-type"></div>
										</div>
									</div>
									<div class="middle">
										<div class="card-code">****</div>
										<div class="card-code">****</div>
										<div class="card-code">****</div>
										<div class="card-code">****</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-xs-12">
							<label>Inserisci la cifra n° x, n° x, n° x e n° x della
								carta.</label>
						</div>
						<div class="input-group-block">
							<div class="col-xs-3">
								<input type="text" class="text-input masked-pan-value"
									name="cfrOne" id="cfr1" placeholder="*" />
							</div>
							<div class="col-xs-3">
								<input type="text" class="text-input masked-pan-value"
									name="cfrTwo" id="cfr2" placeholder="*" />
							</div>
							<div class="col-xs-3">
								<input type="text" class="text-input masked-pan-value"
									name="cfrThree" id="cfr3" placeholder="*" />
							</div>
							<div class="col-xs-3">
								<input type="text" class="text-input masked-pan-value"
									name="cfrFour" id="cfr4" placeholder="*" />
							</div>
							<div class="input-msg masked-pan-msg"></div>
						</div>
					</div>
					<fieldset>
						<input type="submit" name="send" value="CONFERMA"
							id="confirm-maskedpan-btn" />
						<div class="bottom-text chances-left hide-it">
							Tentativi rimasti:&nbsp;<span>3</span>
						</div>
					</fieldset>
					<br /> <br /> <br /> <br />
				</form>
			</div>
		</div>

	</div>
</div>