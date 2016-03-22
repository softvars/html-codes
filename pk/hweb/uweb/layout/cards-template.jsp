<script type="template" id="cardsTemplate">
    <@ _.each(cards,function(card, key, list) { @>
        <div class="col-sm-6 col-md-4 col-xs-12 credit-card-container">
            <div class="credit-card">
                <div class="row">
                    <div class="col-xs-9">
                        <span class="card-name"><@= card.cardAlias @></span>
                    </div>
                <@= this.isPreferredCard(card.paymentMethodId) ? '<div class="col-xs-3 align-right"><div class="star"></div></div>' : '' @>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card-plate <@= this.isHypeCard(card) ? 'hype ':'' @>hover">
                            <div class="top">
                                <div class="chip"></div>
                                <div class="type">
                                    <div class="<@= this.isHypeCard(card) ? 'hype': card.circuitName.toLowerCase() @>"></div>
                                </div>
                            </div>
                            <div class="middle">
                               <div class="asterisk">**** **** ****</div><div class="lastdigit"><@= this.extractPan(card.maskedPan) @></div>
                            </div>
                            <div class="bottom">
                                <div class="holder">
                                    <div class="label">intestata</div>
                                    <div class="name"><@= card.holder @></div>
                                </div>
                                <div class="expiry-date align-right">
                                    <div class="label">validit&#224;</div>
                                    <div class="name"><@= card.expiryMonth @>/<@= card.expiryYear @></div>
                                </div>
                            </div>
                        </div>
                        <@ if(! this.isHypeCard(card)) { @>
                        <div class="card-plate hidden-element card-info">
                            <div class="middle">
                                <a href="#edit_card" class="open-edit-cards"  data-card-id="card-<@= key @>" alt="modifica carta">
                                    <div class="edit"></div>
                                    <div class="text">Modifica carta</div>
                                </a>
                            </div>
                        </div>
                        <@ } @>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="status"></div>
                    </div>
                </div>
            </div>
        </div>
    <@ }, walletController); @>
</script>

<script type="template" id="editCardsTemplate">
    <@ _.each(cards,function(card, key, list){ @>
        <@ if(!this.isHypeCard(card)) { @>
        <div class="item" id="card-<@= key @>">
            <div class="row">
                <div
                    class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
                    <form method="POST" id="edit-card-form-<@= key @>" class="edit-card-form" action="" data-paymentmethod-id="<@=card.paymentMethodId@>">
                        <fieldset>
                            <div class="input-group-block">
                                <input type="text" class="readonly" name="cardAlias" id="card-name" placeholder="Nome carta di credito"
                                value="<@= card.cardAlias @>" readonly/>
                            </div>
                        </fieldset>
                        <div class="credit-card">
                            <div class="flip-container" id="card-container-<@= key @>">
                                <div class="flipper">
                                    <div class="card-plate front">
                                        <div class="top">
                                            <div class="chip"></div>
                                            <div class="type">
                                                <div class="card-type <@= card.circuitName.toLowerCase() @>"></div>
                                            </div>
                                        </div>
                                        <div class="middle">
                                            <div class="card-code code-1">****</div>
                                            <div class="card-code code-2">****</div>
                                            <div class="card-code code-3">****</div>
                                            <div class="card-code code-4" data-code-4="<@= this.extractPan(card.maskedPan) @>"><@= this.extractPan(card.maskedPan) @></div>
                                        </div>
                                        <div class="bottom">
                                            <div class="holder">
                                                <div class="label">intestata</div>
                                                <div class="name"><@= card.holder @></div>
                                            </div>
                                            <div class="expiry-date align-right">
                                                <div class="label">validit&#224;</div>
                                                <div class="name">
                                                    <span class="expiry-date-month"><@=card.expiryMonth@></span> / <span class="expiry-date-year"><@=card.expiryYear@></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-plate back">
                                        <div class="top">
                                            <div class="magnetic-stripe"></div>
                                        </div>
                                        <div class="middle">
                                            <div class="sign-place"></div>
                                            <div class="cvc" id=""></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="row month-limit">
                            <div class="col-xs-6 less-padding-right">
                                <div class="text">Limite mensile</div>
                            </div>
                            <div class="col-xs-6 less-padding-left">
                                <div class="import">&euro;<@= card.plafond @></div>
                            </div>
                        </div> -->

						<div class="row">
						    <div class="col-xs-12 pan-div hide-it">
							  <fieldset>
                                <div class="input-group input-error-fix">
                                     <input type="text" name="pan" class="text-input edit-card-code" placeholder="Numero carta di credito" />
                                         <span class="input-group-btn">
                                            <span class="input-group-addon"></span>
										</span>
                                        <div class="input-msg"></div>
                                </div>
                              </fieldset>
                            </div>
						</div>
                        <div class="row">
                            <div class="col-xs-6 less-padding-right expiry-date-parent">
                                <fieldset>
                                    <div class="input-group input-error-fix">
                                        <input type="text" class="text-input expiry-date"  data-target-id="card-container-<@= key @>" name="expiryDate"  value="<@= card.expiryMonth @>/<@= card.expiryYear @>" placeholder="MM / AA" data-pre-value="<@= card.expiryMonth @>/<@= card.expiryYear @>"/>
                                        <span class="input-group-btn">
                                            <span class="input-group-addon"></span>
                                        </span>
                                        <div class="input-msg"></div>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col-xs-6 less-padding-left cvv-code-parent hide-it">
                                <fieldset>
                                    <div class="input-group info-black input-error-fix">
                                        <input type="text" class="text-input cvc-code" data-target-id="card-container-<@= key @>" id="cvc-code-<@= key @>" placeholder="CVC" class="form-control" name="cvv" />
                                        <span class="input-group-btn">
                                            <span class="input-group-addon cvc-popover" id="cvc-popover-<@= key @>"></span>
                                        </span>
                                        <div class="input-msg"></div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12 less-padding-right">
                                <div class="checkbox">
                                    <input class="fav-card" id="fav-card-<@= key @>" type="checkbox" name="prefferedCard" <@= this.isPreferredCard(card.paymentMethodId) ? 'checked="checked"' : '' @>>
                                    <label for="fav-card-<@= key @>" class="noselect">carta preferita</label>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" id="circuitName" class="readonly" name="circuitName" value="<@= card.circuitName.toLowerCase() @>" />
                        <fieldset>
                            <input type="submit" data-edit-card-id="edit-card-form-<@= key @>"  class="edit-card-btn" name="send" value="SALVA MODIFICHE" id="submit-<@= key @>" />
                            <input type="hidden" id="paymentMethodId<@= key @>" name="paymentMethodId" value="<@= card.paymentMethodId @>" />
                            <div href="#" class="delete-card confirm" confirm-type="card-delete" confirm-head="RIMUOVI CARTA" confirm-body="Sei sicuro di voler rimuovere questa carta?" data-meta="<@= key @>" data-id="<@= card.paymentMethodId @>">
                                <span>Rimuovi carta</span>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
        <@ } @>
    <@ }, walletController); @>
</script>