<script type="template" id="cardsTemplate">
<div id="accordion" class="col-sm-12 col-md-12 col-xs-12">
    <@ _.each(cards,function(card, key, list){ @>
        <@ if(key % 3 === 0){ @> 
        <div class="row">
        <@ } @>
        <div class="col-sm-6 col-md-4 col-xs-12 credit-card-container">
            <div class="credit-card">
                <div class="row">
                    <div class="col-xs-9">
                        <span class="card-name"><@= card.cardAlias @></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card-plate <@= (this.isHypeCard(card) ? 'hype ':'') @>hover">
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
                        <div class="card-plate hidden-element card-info">
                            <div class="middle">
                                <a data-toggle="collapse" href="#choose_card_<@= key@>" data-parent="#accordion" class="choose-card" data-card-id="card-<@= key @>" alt="Seleziona carta">
                                    <div class="check"></div>
                                    <div class="text">Seleziona carta</div>
                                </a>
                            </div>
                        </div>
                        <form method="POST" class="payment-confirm-cvv-form" id="payment-confirm-cvv-form"  action="/upweb/auth/payment/setchosencard"> 
                        <div class="collapse" id="choose_card_<@= key@>">
                            <div id="card_cvv<@= key@>" class="card_cvv col-sm-12">
								<@ var isCVVEnabled = this.isHypeCard(card) ? this.checkCvvForHypeCard === 'Y' : this.checkCvvForOtherCard === 'Y'; @> 
								<@ if(isCVVEnabled) { @>
									<div class="col-xs-5 col-sm-5 card_cvv_input_div">
                                    	<label class="sr-only" for="card_cvv_<@= key @>">CVV</label>
                                    	<input type="password" class="card_cvv_input" name="cvv" id="card_cvv_<@= key @>" placeholder="<@= ('MASTERCARD' === card.circuitName) ? 'CVC': 'CVV' @>" autocomplete="off" />
                               		</div>
								<@ } @>
								<div class="col-xs-5 col-sm-5<@= isCVVEnabled ? '' : ' centered'@> card_cvv_submit_btn">
                                    <input type="hidden" name="paymentTrxId" class="paymentTrxId hide" style="display:none;" value=""/>
                                   	<input type="hidden" name="secrandid" class="secrandid hide" style="display:none;" value=""/>
									<input type="hidden" id="paymentMethodId<@= key @>" name="cardId" value="<@= card.paymentMethodId @>" />
                                    <input type="submit" class="select-card-done-btn<@= isCVVEnabled ? ' readonly' : '' @>" data-paymentmethod-id="<@=card.paymentMethodId@>" value="Conferma" />
                               	</div>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <@ if((key % 3 === 2) || (key === (list.length-1))){ @> 
        </div>
        <@ } @>

    <@ }, paymentController); @>
</div>
</script>