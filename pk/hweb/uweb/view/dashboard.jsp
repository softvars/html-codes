<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<tiles:insertDefinition name="main.dashboard_and_transactions">
	<tiles:putAttribute name="title">
        HYPE WALLET - Dashboard
    </tiles:putAttribute>
	<tiles:putAttribute name="javascript">
		<script type="text/javascript"
			src="<c:url value="/resources/js/controller/transaction.js"/>"></script>
		<script type="text/javascript"
			src="<c:url value="/resources/js/controller/dashboard.js"/>"></script>
		<script type="template" id="transactionTemplate">
        <@ if(dashboardObj.isTransactionListEmpty || up_common.isNoRecord) {@>
        <div class="row no-records">
            <div class="col-sm-12">
                <div class="title">Al momento non hai effettuato nessun movimento.</div>
                <div class="subtitle">Qui troverai l&#8217;elenco dei tuoi ultimi movimenti in ordine cronologico.</div>
            </div>
        </div>
        <@}else {@>
        <@ _.each(transactions,function(transaction, key, list){ @>
            <@ var status_ = transaction.meta.status; @>
            <div data-idx="<@=transaction.meta.idx@>" class="row <@=key %2 == 0 ? 'even ' : 'odd '@> <@= this.TXN_STATUS_LIST_2[status_] ? ' '+ this.TXN_STATUS_LIST_2[status_] : ''@>">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-xs-2 col-sm-2">
                            <div class="upper">
                                <div class="month"><@= this.MONTHS_SHORT[transaction.meta.dateTokens[0]] @> <span class="year"><@= transaction.meta.dateTokens[2] @></span></div>
                            </div>
                            <div class="lower">
                                <div class="day"><@= transaction.meta.dateTokens[1] @></div>
                            </div>
                        </div>
                        <div class="col-xs-5 col-sm-7">
                            <div class="upper">
                                <div class="beneficiary"><@= transaction.payedTo @></div>
                            </div>
                            <div class="lower">
                                <div class="card">
                                    <span class="name"><@= transaction.aliasCreditCard @></span><span class="dot hidden-xs"> &#183; </span><span class="type"><@= transaction.payedWith @> <@= transaction.creditCard @></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-5 col-sm-3">
                            <div class="upper">
                                <div class="amount">&euro;<@= transaction.totalOrderPrice @></div>
                            </div>
                            <div class="lower">
                                <div class="state"><@= status_ @></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <@ }, dashboardObj); }@>
    </script>
	</tiles:putAttribute>
	<tiles:putAttribute name="app-add">
		<c:if test="${registrationMessage ne null}">
			<div id="msg-ok-alert" class="alert alert-success alert-dismissible"
				role="alert">
				<div class="container">
					<button type="button" class="close close-alert"
						alert-id="#msg-ok-alert" aria-label="Close"></button>
					${registrationMessage}
				</div>
			</div>
		</c:if>
		<div class="container-fluid notify">
			<div class="row">
				<div class="container">
					<div class="row">
						<div class="col-md-8 col-sm-6 col-xs-12" id="notify-welcome">
							<div class="welcome up">
								Ciao <span class="user-name text-capitalize">${userInfo.firstName.toLowerCase()}</span>!
							</div>
							<div class="welcome down">Scarica gratuitamente l'applicazione Hype Wallet sul tuo smartphone.</div>
						</div>
						<div class="col-md-4" id="notify-close">
							<div>
								<div class="close"></div>
							</div>
						</div>
					</div>
					<div class="row">
					    <div class="col-xs-1 hidden-sm hidden-md hidden-lg">
                            <div class="smartphones"></div>
                        </div>
						<div class="col-md-2 col-sm-3 col-xs-5">
							<a href="https://itunes.apple.com/us/app/hype-wallet-up-mobile/id475738173?ls=1&mt=8" target="_blank" title="App Store" class="app-store badge">
								<div class="label">disponibile su</div>
								<div class="store">app store</div>
							</a>
						</div>
						<div class="col-md-2 col-sm-3 col-xs-5">
							<a href="https://play.google.com/store/apps/details?id=it.reply.up.mobile.android" target="_blank" title="Google Play" class="google-play badge">
								<div class="label">android app on</div>
								<div class="store">google play</div>
							</a>
						</div>
						<div class="col-md-8 col-sm-6">
							<div class="smartphones hidden-xs"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</tiles:putAttribute>
	<tiles:putAttribute name="body">
		<div class="row">
			<div class="col-md-8">
				<div class="movements">
					<div class="container-fluid">
						<div class="row head last">
							<div class="col-sm-12">
								<div class="row">
									<div class="col-xs-10">Ultimi movimenti</div>
									<div class="col-xs-2 align-right">
										<a href="<c:url value='/auth/transaction?secrandid=${secrandid}' />"
											title="Vedi tutti" class="show-all hidden-xs"></a>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-12">
								<div class="divider"></div>
							</div>
						</div>
						<div id="latestTransactions" class="transactions-container"></div>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<c:if test="${preferredCard != null}">
					<div class="credit-cards">
						<div class="container-fluid">
							<div class="row head">
								<div class="col-sm-12">
									<div class="row">
										<div class="col-xs-10">Carte di credito</div>
										<div class="col-xs-2 align-right">
											<a href="<c:url value='/auth/profile?secrandid=${secrandid}#Carte' />"
												title="Vedi tutte" class="show-all hidden-xs"></a>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12">
									<div class="divider"></div>
								</div>
							</div>
							<div class="row favorite-credit-card">
								<div class="col-sm-12">
									<div class="row">
										<div class="col-xs-9">
											<span class="card-name">${preferredCard.cardAlias}</span>
										</div>
										<div class="col-xs-3 align-right">
											<div class="star"></div>
										</div>
									</div>
									<div class="row">
										<div class="col-sm-12">
											<div class="card-plate">
												<div class="top">
													<div class="chip"></div>
													<div class="type">
														<div class="${preferredCard != null ? preferredCard.circuitName.toLowerCase() : ''}"></div>
													</div>
												</div>
												<div class="middle">
													<div class="asterisk">**** **** ****</div>
													<div class="lastdigit">${preferredCard.maskedPan}</div>
												</div>
												<div class="bottom">
													<div class="holder">
														<div class="label">intestata</div>
														<div class="name">${preferredCard.holder}</div>
													</div>
													<div class="expiry-date align-right">
														<div class="label">validit&#224;</div>
														<div class="name">${preferredCard.expiryMonth}/
															${preferredCard.expiryYear}</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</c:if>
				<div class="support">
					<div class="container-fluid">
						<div class="row head">
							<div class="col-sm-12">
								<div class="row">
									<div class="col-xs-10">Supporto</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-12">
								<div class="divider"></div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-12">
								<form method="POST" class="support-form" id="support-form"
									action="">
									<fieldset>
										<label for="area">area</label>
										<div class="input-group input-group-block">
											<select name="area" id="area" class="selectpicker">
												<option>Transazioni</option>
												<option>Carte</option>
												<option>Profilo</option>
												<option>Indirizzi</option>
												<option>ALTRO</option>
											</select>
										</div>
									</fieldset>
									<fieldset>
										<label for="title">titolo</label>
										<div class="input-group">
											<input type="text" name="title" id="title"
												placeholder="Scrivi qui il titolo..." /> <span
												class="input-group-btn"> <span
												class="input-group-addon"></span>
											</span>
											<div class="input-msg"></div>
										</div>
									</fieldset>
									<fieldset>
										<label for="message">messaggio</label>
										<div class="input-group input-group-block input-error-fix">
											<textarea id="message" name="message"
												placeholder="Scrivi qui il tuo messaggio..."></textarea>
											<span class="input-group-btn input-group-btn-textarea">
												<span class="input-group-addon"></span>
											</span>
											<div class="input-msg"></div>
										</div>
									</fieldset>
									<fieldset>
										<input type="submit" name="send" value="INVIA" .modal />
									</fieldset>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</tiles:putAttribute>
</tiles:insertDefinition>