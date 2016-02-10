define(["app",
        'templates',
        "backbone.syphon"
    ],
    function(Appersonam, JST, moment) {
        Appersonam.module("CardApp.RechargeProfile.View", function(View, Appersonam, Backbone, Marionette, $, _, Handlebars) {

            var detectCardType = function(number) {
                var re = {
                    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
                    maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
                    dankort: /^(5019)\d+$/,
                    interpayment: /^(636)\d+$/,
                    unionpay: /^(62|88)\d+$/,
                    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
                    mastercard: /^5[1-5][0-9]{14}$/,
                    amex: /^3[47][0-9]{13}$/,
                    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
                    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
                    jcb: /^(?:2131|1800|35\d{3})\d{11}$/
                };
                if (re.electron.test(number)) {
                    return 'ELECTRON';
                } else if (re.maestro.test(number)) {
                    return 'maestro';
                } else if (re.dankort.test(number)) {
                    return 'DANKORT';
                } else if (re.interpayment.test(number)) {
                    return 'INTERPAYMENT';
                } else if (re.unionpay.test(number)) {
                    return 'UNIONPAY';
                } else if (re.visa.test(number)) {
                    return 'visa';
                } else if (re.mastercard.test(number)) {
                    return 'mastercard';
                } else if (re.amex.test(number)) {
                    return 'amex';
                } else if (re.diners.test(number)) {
                    return 'diners';
                } else if (re.discover.test(number)) {
                    return 'DISCOVER';
                } else if (re.jcb.test(number)) {
                    return 'jcb';
                } else {
                    return 'generic-card';
                }
            };

            /*var maskPan = function(pan) {
                var maskedPan = pan.replace(/(\d{6})\d{6}(\d{4})/, '$1******$2');
                return maskedPan.replace(/([0-9*]{4})([0-9*]{4})([0-9*]{4})([0-9*]{4})/, '$1 $2 $3 $4');
            };*/

            View.GenericFormContainerView = Marionette.Layout.extend({
                events: {
                    'click .js-back': 'back',
                    'click .js-toggle-menu': 'cornerMenu',
                    'click .js-submit': 'submitClicked'
                },
                submitClicked: function(e) {
                    if (e) {
                        e.preventDefault();
                    }
                    this.clearFormErrors();
                    var data = {};
                    if (!this.model.id) {
                        data = Backbone.Syphon.serialize(this);
                        data.cardNumber = data.cardNumber.replace(/\s+/g, '');
                        delete data.monthText;
                    } else {
                        data = {
                            cvv: this.$el.find('#cvv').val(),
                            expiryYear: this.$el.find('#expiryYear').val(),
                            expiryMonth: this.$el.find('#expiryMonth').val()
                        }
                    }
                    //delete data.amount;

                    data.circuitName = detectCardType(data.cardNumber).toUpperCase();
                    this.trigger('submit', data);
                },
                addBlur: function() {
                    this.$el.addClass('blurred-element');
                },
                removeBlur: function() {
                    this.$el.removeClass('blurred-element');
                },
                back: function(e) {
                    if (e) {
                        e.preventDefault();
                    }
                    this.trigger('back');
                },
                clearFormErrors: function() {
                    var $form = this.$el;
                    $form.find(".help-inline.error").each(function() {
                        $(this).remove();
                    });
                    $form.find('.error').removeClass('error');
                },
                onFormDataInvalid: function(errors) {
                    var $view = this.$el;
                    var markErrors = function(value, key) {
                        var $validatedInput = $view.find(".js-validate-element-" + key);
                        var $errorEl = $("<span>", {
                            class: "help-inline error",
                            text: value
                        });
                        $validatedInput.after($errorEl).addClass("error");
                        cardValidatedInput = $view.find(".virtual-card ." + key + '-input');
                        cardValidatedInput.addClass('error');
                    }
                    this.clearFormErrors();
                    _.each(errors, markErrors);
                },
                cornerMenu: function(e) {
                    if (e) {
                        e.preventDefault();
                    }
                    this.trigger('corner:menu');
                }
            });

            View.CardEditContainerView = View.GenericFormContainerView.extend({
                template: JST['assets/js/apps/card/recharge/profile/templates/card_edit.html'],
                className: 'card-edit-container',
                specificEvents: {
                    'click .js-delete': 'deleteClicked'
                },
                regions: {
                    formRegion: '#form-region',
                },
                deleteClicked: function(e) {
                    if (e) {
                        e.preventDefault();
                    }
                    this.trigger('delete');
                },
                initialize: function() {
                    if (this.specificEvents) {
                        this.events = _.extend(this.events, this.specificEvents);
                    }
                }
            });

            View.MyCardsView = View.GenericFormContainerView.extend({
                template: JST['assets/js/apps/card/recharge/profile/templates/my_cards.html'],
                regions: {
                    contentRegion: '#cards-content-region'
                },
                specificEvents: {
                    'click .js-add-card': 'addCard'
                },
                addCard: function(e) {
                    if (e) {
                        e.preventDefault();
                    }
                    this.trigger('add:card');
                },
                cornerMenu: function(e) {
                    if (e) {
                        e.preventDefault();
                    }
                    this.trigger('corner:menu');
                },
                addBlur: function() {
                    this.$el.addClass('blurred-element');
                },
                removeBlur: function() {
                    this.$el.removeClass('blurred-element');
                },
                clearFormErrors: function() {
                    var $form = this.$el;
                    $form.find(".help-inline.error").each(function() {
                        $(this).remove();
                    });
                    $form.find('.error').removeClass('error');
                },
                onFormDataInvalid: function(errors) {
                    var $view = this.$el;
                    var markErrors = function(value, key) {
                        var $validatedInput = $view.find(".js-validate-element-" + key);
                        var $errorEl = $("<span>", {
                            class: "help-inline error",
                            text: value
                        });
                        $validatedInput.after($errorEl).addClass("error");
                        cardValidatedInput = $view.find(".virtual-card ." + key + '-input');
                        cardValidatedInput.addClass('error');
                    }
                    this.clearFormErrors();
                    _.each(errors, markErrors);
                },
                initialize: function() {
                    if (this.specificEvents) {
                        this.events = _.extend(this.events, this.specificEvents);
                    }
                }
            });

            View.ProfileView = View.GenericFormContainerView.extend({
                template: JST['assets/js/apps/card/recharge/profile/templates/profile.html'],
                className: 'card-view',
                removeError: function(key) {
                    this.$el.find('.js-validate-element-' + key).siblings('.error').remove();
                },
                regions: {
                    defaultCardRegion: '#default-card-region',
                    formRegion: '#form-region',
                    keyboardRegion: Marionette.Region.KeyboardRegion
                },
                toggleScroll: function() {
                    this.$el.find('.panel-content').toggleClass('scrollable'); //per evitare che sotto la tastiera si veda il resto della view
                },
                setAmount: function(amount) {
                    if (amount) {
                        this.$el.find('#entity-amount').html(amount.replace('.', ','));
                        this.$el.find('[name="amount"]').val(amount);
                    } else {
                        amount = this.$el.find('[name="amount"]').val();
                    }
                    this.model.set({
                        amount: amount
                    }, {
                        silent: true
                    });
                    this.amount = amount;
                },
                showKeyboard: function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation()
                    }
                    var amount = this.$el.find('[name="amount"]').val().replace(/^0+(?!$)/, '');
                    if (this.$el.find(".keyboard-container").hasClass("slideIn")) {
                        this.trigger('keyboard:close');
                    } else {
                        this.trigger('keyboard:show', '' + parseFloat(amount.replace(',', '.')));
                    }
                },
                specificEvents: {
                    'click .amount-container': 'showKeyboard',
                    'submit form': 'focusoutcardNumber',
                    'click .js-toggler': 'toggle'
                },
                toggle: function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    this.$el.find('.slider').toggleClass('closed');
                    this.newCard = !this.newCard;
                },
                hideDefaultCard: function() {
                    this.$el.find('.js-toggler').first().addClass('hidden');
                    this.$el.find('#default-card-region').first().addClass('hidden');
                    this.toggle();
                },
                initialize: function() {
                    if (this.specificEvents) {
                        this.events = _.extend(this.events, this.specificEvents);
                    }
                }
            });

            View.CardFormView = Marionette.Layout.extend({
                template: JST['assets/js/apps/card/recharge/profile/templates/form.html'],
                className: 'card-page card-recharge',
                tagName: 'form',
                regions: {},
                events: {
                    //'click a.turn-card': 'toggleCard',
                    'input  #cvv': 'cvvPressed',
                    'input #cardNumber': 'cardNumberPressed',
                    'input input[name="cvv"]': 'cvvPressed',
                    'focusout .cardNumber-input': '',
                    'focusin #year': 'selectYear',
                    'focusin #monthText': 'selectMonth',
                    'focusin input[name="cvv"]': 'cvvIn',
                    'focusout input[name="cvv"]': 'cvvOut'
                },
                cvvOut: function() {
                    this.$el.find('.virtual-card').removeClass('rotate');
                },
                cvvIn: function() {
                    this.$el.find('.virtual-card').addClass('rotate');
                },
                selectYear: function(e) {
                    e.preventDefault();
                    this.trigger('combo', 'year', this.yearsList);
                    $(e.currentTarget).blur();
                },
                selectMonth: function(e) {
                    e.preventDefault();
                    this.trigger('combo', 'month', this.monthsList);
                    $(e.currentTarget).blur();
                },
                focusoutcardNumber: function() {
                    this.checkCardType(this.$el.find('#cardNumber_1').val() + '');
                },
                removeError: function(key) {
                    this.$el.find('.js-validate-element-' + key).siblings('.error').remove();
                },
                onSetValue: function(key, value, text) {
                    this.$el.find('.js-' + key).html(value);
                    this.$el.find('.js-' + key).val(value);
                    if (key === 'month') {
                        this.$el.find('#monthText').val(text);
                    }
                },
                checkCardType: function(cardNumber) {
                    if (('' + cardNumber).length > 3) {
                        var isVisa = cardNumber[0] === '4';
                        var isMasterCard = parseInt(cardNumber.substring(0, 2)) >= 51 && parseInt(cardNumber.substring(0, 2)) <= 55;
                        if (isMasterCard) {
                            var cardType = 'Master Card';
                        } else if (isVisa) {
                            cardType = 'Visa';
                        } else {
                            cardType = false;
                        }
                        if (!cardType) {
                            this.$el.find('.js-card-number-label').html('N. CARTA ( Altra carta )');
                        } else {
                            this.$el.find('.js-card-number-label').html('N. CARTA ( ' + cardType + ' )');
                        }
                    } else {
                        this.$el.find('.js-card-number-label').html('N. CARTA');
                    }
                },
                onShow: function() {
                    var currentYear = this.model.get('expiryYear');
                    var curMonthValue = this.model.get('expiryMonth');
                    if (!currentYear) {
                        currentYear = new Date().getFullYear().toString().substring(2, 4);
                    }
                    if (!curMonthValue) {
                        curMonthValue = '01';
                    }
                    Backbone.Syphon.deserialize(this, this.model.toJSON());
                    var curMonth = this.monthsList.where({
                        value: curMonthValue
                    })[0];
                    this.onSetValue('month', curMonth.get('value'), curMonth.get('text'));
                    this.onSetValue('year', currentYear, currentYear.toString().substring(2, 4));
                   
                    this.$el.find('#cardNumber').trigger('input');
                },
                preventChar: function(e) {
                    var numeric = true;
                    var keyCode = e.keyCode;
                    if (keyCode >= 65 && keyCode <= 90) {
                        e.preventDefault();
                        numeric = false;
                    } else {
                        if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
                            numeric = true
                        } else {
                            numeric = false;
                        }
                    }
                    return numeric;
                },
                cvvPressed: function(e) {
                    if (13 === e.keyCode) {
                        this.trigger('submit');
                    } else {
                        var currentInput = $(e.currentTarget);
                        var newVal = currentInput.val();
                        if (newVal.length < 4 && !isNaN(newVal.slice(-1))) {
                            $('.js-cvv').html(newVal);
                        } else {
                            currentInput.val(newVal.substring(0, newVal.length - 1));
                        }
                    }
                },
                cardNumberPressed: function(e) {
                    if (13 === e.keyCode) {
                        this.trigger('submit');
                    } else {
                        var currentInput = $(e.currentTarget);
                        var styledValue = '';
                        var newVal = currentInput.val();
                        var splittedCardNumber = newVal.replace(/\s+/g, '').match(/[\s\S]{1,4}/g) || [];
                        if (splittedCardNumber.length < 5 && !isNaN(newVal.slice(-1))) {
                            for (var j = 0; j < splittedCardNumber.length; j++) {
                                if (splittedCardNumber[j]) {
                                    styledValue += ' ' + splittedCardNumber[j]
                                }
                            }
                            currentInput.val(styledValue.trim());
                            $('.js-pan').html(styledValue.trim());
                            var cardType = detectCardType(newVal.replace(/\s+/g, ''));
                            this.$el.find('.cardlogo').removeClass().addClass('cardlogo card-element ' + cardType);
                        } else {
                            currentInput.val(newVal.substring(0, newVal.length - 1));
                        }
                    }
                },
                initialize: function() {
                    this.cvvValue = '';
                    this.yearsList = new Backbone.Collection();
                    var currentYear = new Date().getFullYear();
                    var i = currentYear;
                    while (i < currentYear + 11) {
                        var value = ('' + i).substring(2, 4);
                        var yearModel = new Backbone.Model({
                            value: value,
                            text: value
                        });
                        this.yearsList.add(yearModel);
                        i++;
                    }

                    var months = [{
                        text: 'Gennaio',
                        value: '01'
                    }, {
                        text: 'Febbraio',
                        value: '02'
                    }, {
                        text: 'Marzo',
                        value: '03'
                    }, {
                        text: 'Aprile',
                        value: '04'
                    }, {
                        text: 'Maggio',
                        value: '05'
                    }, {
                        text: 'Giugno',
                        value: '06'
                    }, {
                        text: 'Luglio',
                        value: '07'
                    }, {
                        text: 'Agosto',
                        value: '08'
                    }, {
                        text: 'Settembre',
                        value: '09'
                    }, {
                        text: 'Ottobre',
                        value: '10'
                    }, {
                        text: 'Novembre',
                        value: '11'
                    }, {
                        text: 'Dicembre',
                        value: '12'
                    }];
                    this.monthsList = new Backbone.Collection(months);
                    if (!!this.model.id) {
                        this.model.set('cardNumber', this.model.get('maskedPan'));
                        this.model.set('cvv', '***');
                        this.model.set({
                            edit: true
                        });
                    }
                },
                toggleCard: function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    this.$el.find('.virtual-card').toggleClass('rotate');
                }
            });

            View.Resume = Marionette.ItemView.extend({
                className: "card-recharge-resume-page",
                template: JST['assets/js/apps/card/recharge/profile/templates/resume.html'],
                events: {
                    'click a.js-confirm': 'confirmClicked',
                    'click a.js-cancel': 'close'
                },
                initialize: function() {
                    this.lockButton = false; //lockbutton true impedisce che il click scateni l'evento di conferma
                },
                onClose: function() {
                    this.lockButton = false;
                },
                onSetLockButton: function(value) {
                    this.lockButton = value;
                },
                confirmClicked: function(e) {
                    e.preventDefault();
                    if (this.lockButton !== true) {
                        console.log('evento ricarica carta');
                        this.lockButton = true;
                        this.trigger('confirm');
                    }
                }
            });

            View.ListItemView = Marionette.ItemView.extend({
                className: "cards-list-element",
                tagName: 'div',
                events: {
                    'click': 'clicked'
                },
                template: JST['assets/js/apps/card/recharge/profile/templates/cards_list_item.html'],
                clicked: function(e) {
                    e.preventDefault();
                    this.trigger('selected')
                },
                initialize: function() {
                    //var cardNumber = this.model.get('cardNumber');
                    //var panStart = cardNumber.substring(0, 4);
                    //var panEnd = cardNumber.substring(12, 16);
                    //var cardType = this.detectCardType(cardNumber);
                    /*
                    this.model.set({
                        panStart: panStart,
                        panEnd: panEnd,
                        cardType: cardType
                    }, {
                        silent: true
                    });//evito che l'evento change venga applicato alla collectionView
                    */
                    //this.render();
                }
            });

            View.ListView = Marionette.CompositeView.extend({
                className: "cards-list-container",
                tagName: 'div',
                template: JST['assets/js/apps/card/recharge/profile/templates/cards_list.html'],
                itemView: View.ListItemView,
                itemViewContainer: '.cards-list',
                initialize: function() {
                    if (this.options.renderOnChange) {
                        this.collection.bind('change', function() {
                            this.render();
                        }, this);
                    }
                },
                onRender: function() {
                    console.log();
                },
                group: function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    this.toggle();
                    this.trigger('group');
                },
                toggle: function() {
                    this.$el.toggleClass('closed');
                },
                events: {
                    'click .js-group': 'group'
                }
            });

            View.CardSelectView = View.GenericFormContainerView.extend({
                className: "card-select",
                tagName: 'div',
                template: JST['assets/js/apps/card/recharge/profile/templates/card_select.html'],
                regions: {
                    cardsListRegion: '#cards-list-region'
                }
            });


        }, Handlebars);

        return Appersonam.CardApp.RechargeProfile.View;
    });
