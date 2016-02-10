define(["app", 'templates', "backbone.syphon"],
    function(Appersonam, JST) {
        Appersonam.module("GoalsApp.Transfer.Views", function(Views, Appersonam, Backbone, Marionette, $, _, Handlebars) {
            Views.Form = Marionette.Layout.extend({
                template: JST['assets/js/apps/activities/goals/transfer/templates/transfer.html'],
                regions: {
                    keyboardRegion: Marionette.Region.KeyboardRegion
                },
                initialize: function() {
                    this.destination = 'spendable';
                    this.newAmount = '';
                    this.newSpendable = 'spendable';
                },
                events: {
                    "click .js-confirm": "submitClicked",
                    "click .js-viceversa": "viceversa",
                    "click a.back": "back",
                    "click .amount-container": "showKeyboard",
                    'keydown input': 'keyDownInput'
                },
                keyDownInput: function(e) {
                    var keyCode = e.keyCode;
                    if (keyCode === 13) {
                        e.preventDefault();
                        this.submitClicked(e);
                    }
                },
                onShow: function() {
                    Backbone.Syphon.deserialize(this, this.model.toJSON());

                    var dynamicWidth = $('#transfer-resume-sender-container').width();

                    $('#transfer-resume-sender-container').height(dynamicWidth);
                    $('#transfer-resume-container').height(dynamicWidth);
                    $('#transfer-arrow-container').height(dynamicWidth);

                    this.calculateTransfer();
                },    
                back: function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger('back');
                },
                viceversa: function(e) {
                    e.preventDefault();

                    if (this.destination === 'spendable') {
                        this.destination = 'goal';
                        this.$el.find('#transfer-arrow-container .direction-line').addClass('rotate');
                    } else {
                        this.destination = 'spendable';
                        this.$el.find('#transfer-arrow-container .direction-line').removeClass('rotate');
                    }

                    this.calculateTransfer();
                },
                showKeyboard: function(e) {
                    e.preventDefault();
                    var value = this.$el.find('[name="amount"]').val().replace(/^0+(?!$)/, '');
                    this.trigger('keyboard:show', value);
                },
                setAmount: function(data) {
                    var value = data;

                    this.$el.find('#entity-total').html(value.replace('.', ',').replace(/^0+(?!$)/, ''));
                    this.$el.find('[name="amount"]').val(value);

                    this.calculateTransfer();
                },
                calculateTransfer: function() {
                    this.hideMessage();
                    var value = this.$el.find('[name="amount"]').val();

                    var currentAmount = this.model.get('goal').currentAmount;
                    var spendable = this.model.get('financial').spendable;

                    if (value > 0 && (isNaN(value)) === false) {
                        if (this.destination === 'spendable') {
                            if (currentAmount >= value) {
                                this.newAmount = parseFloat(currentAmount) - parseFloat(value);
                                this.newSpendable = parseFloat(spendable) + parseFloat(value);
                            } else {
                                this.$el.find('#transfer-goal-amount').parents(".baloon").addClass("error");

                                this.newAmount = 0;
                                this.newSpendable = parseFloat(spendable) + parseFloat(value);
                                this.showMessage("La cifra che si vuole trasferire supera l'ammontare dell'obbiettivo");
                            }
                        } else {
                            if (spendable >= value) {
                                this.newAmount = parseFloat(currentAmount) + parseFloat(value);
                                this.newSpendable = parseFloat(spendable) - parseFloat(value);
                            } else {
                                this.$el.find('#transfer-spendable-amount').parents(".baloon").addClass("error");

                                this.newSpendable = 0;
                                this.newAmount = parseFloat(currentAmount) + parseFloat(value);
                                this.showMessage("La cifra che si vuole trasferire supera il Puoi Spendere");
                            }
                        }
                    } else {
                        this.showMessage("Inserire un importo valido");
                    }

                    this.$el.find('#transfer-goal-amount').html(this.newAmount.toFixed(2));
                    this.$el.find('#transfer-spendable-amount').html(this.newSpendable.toFixed(2));
                },
                hideMessage: function() {
                    var element = this.$el.find('.message');
                    element.fadeOut();

                    this.$el.find('#transfer-goal-amount').parents(".baloon").removeClass("error");
                    this.$el.find('#transfer-spendable-amount').parents(".baloon").removeClass("error");
                    this.$el.find('#transfer-submit-button').removeClass("inactive");
                },
                showMessage: function(message) {
                    var element = this.$el.find('.message');
                    element.html(message);
                    element.fadeIn();
                    this.$el.find('#transfer-submit-button').addClass("inactive");
                },
                submitClicked: function(e) {
                    e.preventDefault();
                    this.trigger("transfer:confirm", this.newAmount.toFixed(2));
                }
            });
}, Handlebars);
return Appersonam.GoalsApp.Transfer.Views;
});