define(["app",
    'templates',
    "moment",
    "backbone.syphon",
    "iban"
], function (Appersonam, JST, moment) {
    Appersonam.module(Appersonam.currentApp.moduleName + ".HypeTransfer.Views", function (Views, Appersonam, Backbone, Marionette, $, _, Handlebars) {

        Views.PeersListItem = Marionette.ItemView.extend({
            //singola view dei destinatari
            template: JST['assets/js/common/p2p/hypeTransfer/templates/peers_list_item.html'],
            events: {
                'click #js-delete-peer': 'deletePeer'
            },
            deletePeer: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('delete:peer', this.model);
            },
            className: "peer-element",
            initialize: function () {
                this.collection = new Backbone.Collection();
            },
            onShow: function () {

            }
        });

        Views.ResumePeers = Marionette.CompositeView.extend({
            className: "p2p-resume-peer-item",
            template: JST['assets/js/common/p2p/hypeTransfer/templates/resumeItem.html'],
            initialize: function () {
                this.model.on('change', function () {
                    this.render();
                }, this);
            },
        });

        Views.Resume = Marionette.CompositeView.extend({
            className: "p2p-resume-page",
            itemViewContainer: '#peers-resume-container',
            itemView: Views.ResumePeers,
            template: JST['assets/js/common/p2p/hypeTransfer/templates/resume.html'],
            events: {
                'click a.js-confirm': 'confirmClicked',
                'click a.js-cancel': 'cancelClicked'
            },
            onShow: function () {
                if (this.collection.length > 1) {
                    this.$el.find(".resume-dialog").addClass("multiple-peers");
                } else {
                    this.$el.find(".resume-dialog").removeClass("multiple-peers");
                    var dynamicWidth = $('#peers-resume-sender-container').width();

                    $('#peers-resume-sender-container').height(dynamicWidth);
                    $('#peers-resume-container').height(dynamicWidth);
                    $('#peer-arrow-container').height(dynamicWidth);
                }
            },
            initialize: function () {
                this.lockButton = false;
            },
            buildItemView: function (item, ItemView) {
                item.set({
                    amount: this.model.get("amount")
                });

                var className = 'peer-item';
                if (this.collection.length > 1) {
                    className = 'peer-item small';
                }
                var view = new ItemView({
                    model: item,
                    className: className
                });
                return view;
            },
            confirmClicked: function (e) {
                e.preventDefault();
                if (this.lockButton === false) {
                    this.lockButton = true;
                    this.trigger('confirm');
                }
            },
            cancelClicked: function (e) {
                e.preventDefault();
                this.trigger('cancel');
            },
            onClose: function () {
                this.lockButton = false;
            },
            onSetLockButton: function (value) {
                this.lockButton = value;
            }
        });
        Views.PeersList = Marionette.CompositeView.extend({
            //compositeview che contiene le itemview con i destinatari. Ha il compito di prendere i destinatari dalle view figlie
            //e mandarle al Form layout
            template: JST['assets/js/common/p2p/hypeTransfer/templates/peers_list.html'],
            //emptyView: NoEntitiesView,
            className: "peers-layout",
            itemView: Views.PeersListItem,
            itemViewContainer: "#peers-list-container",
            initialize: function () {
                this.collection.on('change', function () {
                    this.render();
                }, this);
                this.collection.on('reset', function () {
                    this.render();
                }, this);
                //this.collection.on('add', function () {
                //    this.render();
                //}, this);
                //this.collection.on('remove', function () {
                //    this.render();
                //}, this);
                this.on("itemview:delete:peer", function (childView, modelToRemove) {
                    this.transferMode = false;
                    var silent = modelToRemove.collection.length === 1;
                    this.collection.remove(modelToRemove, {
                        silent: silent
                    });
                    this.trigger('update:collection', this.collection, 'remove');
                    //this.listTitle();
                });
            },
            listTitle: function () {
                /*if ((this.collection && this.collection.length > 0) && this.model.get('mode') === 'request') {
                    this.$el.find('.list-title').show();
                }
                else {
                    this.$el.find('.list-title').hide();
                }*/
            },
            events: {
                'click #js-close-form': 'hideForm',
                'keyup input': 'validatePeer'
            },
            onRender: function () {
                console.log();
            },
            validatePeer: function (e) {
                e.preventDefault();
                e.stopPropagation();
                var destination = this.$el.find('#entity-destination').val();
                var isIban = IBAN.isValid(destination);
                if (isIban && this.model.get('mode') === 'payment') {
                    this.showDates();
                } else {
                    this.hideDates();
                }
                this.clearFormErrors();
                var data = Backbone.Syphon.serialize(this);
                this.trigger('validate:peer:form', data);
            },
            addPeerToList: function (e) {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                this.clearFormErrors();
                var data = Backbone.Syphon.serialize(this);
                var isIBan = IBAN.isValid(data.destination);
                if (isIBan) {
                    data.destination = data.destination.toUpperCase();
                }
                this.trigger('submit:peer:form', data, isIBan);
            },
            clearFormErrors: function () {
                var $form = this.$el.find("form");
                $form.find(".help-inline.error.peer-form").each(function () {
                    $(this).remove();
                });
                $form.find(".control-group.error").each(function () {
                    $(this).removeClass("error");
                });
            },
            onFormDataInvalid: function (errors, className) {
                var $view = this.$el;
                var markErrors = function (value, key) {
                    var $controlGroup = $view.find("#entity-" + key).closest(".input-wrapper");
                    var $errorEl = $("<span>", {
                        class: "help-inline error peer-form error-" + className,
                        text: value
                    });
                    $controlGroup.append($errorEl);
                }
                this.clearFormErrors();
                _.each(errors, markErrors);
            },
            showForm: function (query, firstName, lastName) {
                this.$el.find('input').val('');
                var isIban = IBAN.isValid(query);
                if (/^([00|\+]+\d{2})?3\d{9}$/.test(query) === true || /^[\-\.\w]+@([\-a-zA-Z_0-9]+?\.)*[\-a-zA-Z_0-9]+?\.[a-zA-Z]{2,3}$/.test(query) === true || isIban === true) { //cel mail o iban
                    this.$el.find('#entity-destination').val(query);
                }
                if (firstName) {
                    this.$el.find('#entity-firstName').val(firstName);
                }
                if (lastName) {
                    this.$el.find('#entity-lastName').val(lastName);
                }
                this.$el.find('#js-close-form').show();
                this.$el.find('#destination-form-region').show();
                if (isIban && this.model.get('mode') === 'payment') {
                    this.showDates();
                } else {
                    this.hideDates();
                }
                this.clearFormErrors();
            },
            hideForm: function (e) {
                if (e) {
                    e.preventDefault();
                    this.trigger('close:form');
                }
                this.$el.find('#js-close-form').hide();
                this.$el.find('#destination-form-region').hide();
                this.$el.find('#entity-destination').val('');
            },

            showDates: function () {
                this.$el.find('.js-transferDateContainer').slideDown();
                var dateInput = this.$el.find('#entity-transferDate');
                if (dateInput.val() === '') {
                    var value = moment(new Date()).format('YYYY-MM-DD')
                    dateInput.val(value);
                }
                dateInput.removeAttr('disabled');
            },
            hideDates: function () {
                this.$el.find('.js-transferDateContainer').slideUp();
                this.$el.find('#entity-transferDate').attr('disabled', 'disabled');
            },

            //hideForm: function () {
            //    this.$el.find('#destination-form-region').hide();
            //    this.$el.find('#entity-destination').val('');
            //},
            onShow: function () {

            },
            setPeer: function (object, keepForm) {
                var firstName = object.get('firstName');
                var imageValue = object.get('imageValue');
                var lastName = object.get('lastName');
                var destination = object.get('destination');
                var type = object.get('type');
                var id = object.get('id');
                /*if (keepForm) {//mantiene il form aperto
                    this.collection.add({ id: id, destination: destination, lastName: lastName, firstName: firstName }, { silent: true });
                }
                else {//chiude il form e aggiorna la lista dei feed*/
                this.collection.add({
                    id: id,
                    destination: destination,
                    lastName: lastName,
                    firstName: firstName,
                    imageValue: imageValue,
                    type: type
                });
                this.$el.find('form').hide();
                this.$el.find('input').val('');
                this.listTitle();
                /* }*/
                this.trigger('update:collection', this.collection, 'add');
                //this.$el.find('.peer-element').show();
            }
        });


        Views.Form = Marionette.Layout.extend({
            //questo è il layout, il quale contiene informazioni sul messaggio, 
            //l'importo, prende l'evento di conferma e tutto il resto. Poiché è diviso in regioni;
            //essendo diviso in regioni, è creato come Marionette.Layout, di conseguenza non gli si può assegnare una collection
            //la collection viene pertanto assegnata alla PeersList, che è una composite
            template: JST['assets/js/common/p2p/hypeTransfer/templates/form.html'],
            regions: {
                peersRegion: '#peers-region',
                contactsRegion: '#contacts-region',
                keyboardRegion: Marionette.Region.KeyboardRegion,
                datesRegion: '#dates-region'
            },
            events: {
                "click .js-submit": "submitClicked",
                "click .js-back": "back",
                "click .js-add": "add",
                "click .corner-menu": "cornerMenu",
                "click .amount-container": "showKeyboard",
                'click #check': 'splitCheckbox',
                "input textarea": "keyupTextArea",
                "focusin textarea": "placeCarAtEnd"
            },
            placeCarAtEnd: function (e) {
                var textArea = $(e.currentTarget)
                var tmpStr = textArea.val();
                textArea.val('');
                textArea.val(tmpStr);
            },
            splitCheckbox: function (e) {
                var isChecked = document.getElementById('check').checked;
                this.trigger('split:amount', isChecked);
            },


            initialize: function () {
                try {
                    this.amount = 0;
                    this.transferMode = false;
                    this.model.set({
                        sts: parseFloat(this.model.get('sts')).toFixed(2)
                    }, {
                        silent: true
                    });
                } catch (ex) {
                    LogDB.log('errore inizializzazione view profilo p2p => ' + ex.message);
                }
            },
            onShow: function () {
                this.updateBalance();
                this.$el.find('textarea').val(this.model.get('description'));
                var length = 0;
                if (this.model.get('description')) {
                    length = this.model.get('description').length;
                }
                var messageLength = 150;
                if(this.model.get('isIban')){
                    messageLength = 40;
                }
                this.$el.find('.js-chars-left').html('' + (messageLength - length));
            },
            keyupTextArea: function (e) {
                var messageLength = 150;
                if(this.model.get('isIban')){
                    messageLength = 40;
                }
                var value = $(e.currentTarget).val();
                var length = value.length;
                if (length > messageLength) {
                    e.preventDefault();
                    $(e.currentTarget).val(value.substring(0, messageLength));
                } else {
                    this.$el.find('.js-chars-left').html('' + (messageLength - length));
                }
            },
            showKeyboard: function (e) {
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
            updateCheckbox: function (checked) {
                if (checked) {
                    this.$el.find('#check').attr('checked', 'checked');
                }
                if ($('input.checkbox_check').is(':checked')) {
                    this.$el.find('#check').attr('checked', '');
                }
            },
            setPeersTitle: function (peersCount) {
                var checkbox = this.$el.find('#check');
                var span = this.$el.find('.js-split-amount-link');
                if (peersCount > 1) {
                    if (!this.model.get('amount')) {
                        this.model.set('amount', '0', {
                            silent: true
                        });
                    }
                    //this.$el.find('.list-title > h3').html();
                    var singleAmount = '&euro;' + ('' + Math.round(parseFloat((this.model.get('amount').replace(',', '.') / peersCount)) * 100) / 100).replace('.', ',');
                    span.html("Dividi l'importo e richiedi " + singleAmount + " ad ognuno");
                    //this.$el.find('.list-title > h3').append(span).append(checkbox);
                    this.$el.find('.list-title > h3').show();
                }
                else {
                    this.$el.find('.list-title > h3').hide();
                }
            },
            setAmount: function (amount, peersCount) {
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
                this.setPeersTitle(peersCount);
                this.amount = amount;
                amount = parseFloat(amount);

                this.updateBalance();
            },
            updateBalance: function () {
                if (this.model.get('mode') === 'payment') {
                    var balance = parseFloat(this.model.get('balance'));
                    var sts = parseFloat(this.model.get('sts'));
                    var scheduled = parseFloat(this.model.get('scheduled'));
                    var savedForGoals = parseFloat(this.model.get('savedForGoals'));
                    var amount = parseFloat(this.amount);
                    var remainingBalance = balance - scheduled - amount;
                    var remainingSts = (balance - scheduled - savedForGoals - amount).toFixed(2);

                    if (remainingBalance < 0) {
                        this.$el.find('.insufficient-balance').show();
                        this.$el.find('.insufficient-sts').hide();
                        this.$el.find('.sufficient-sts').hide();

                        this.allowSend = false;
                        this.$el.find('.js-submit').addClass("inactive");

                    } else {
                        this.$el.find('.insufficient-balance').hide();

                        if (remainingSts >= 0) {
                            this.$el.find('.sts-left').html(('' + remainingSts).replace('.', ','));
                            this.$el.find('.insufficient-sts').hide();
                            this.$el.find('.sufficient-sts').show();
                        } else {
                            this.$el.find('.sts-left').html(('' + Math.abs(remainingSts)).replace('.', ','));
                            this.$el.find('.insufficient-sts').show();
                            this.$el.find('.sufficient-sts').hide();
                        }

                        this.allowSend = true;
                        this.$el.find('.js-submit').removeClass("inactive");
                    }
                }
            },
            back: function (e) {
                e.preventDefault();
                this.trigger('back');
            },
            addBlur: function () {
                this.$el.addClass('blurred-element');
            },
            removeBlur: function () {
                this.$el.removeClass('blurred-element');
            },
            showResult: function (success, message) {
                if (success === true) {
                    var errorContainer = this.$el.find('.js-result');
                    errorContainer.show().text(message);
                } else {
                    var errorContainer = this.$el.find('.js-result');
                    errorContainer.hide().text(message);
                    errorContainer.fadeIn().delay(2000).fadeOut();
                }
            },
            getData: function () {
                var data = {};
                this.clearFormErrors();
                data.amount = this.$el.find('[name="amount"]').val();
                data.description = this.$el.find('#entity-description').val();
                var today = new moment(new Date()).format('DD/MM/YYYY');
                data.date = today;
                data.transferDate = this.$el.find('#entity-transferDate').val();
                return data;
            },
            submitClicked: function (e) {
                e.preventDefault();
                var data = this.getData();
                if (this.allowSend === true || this.model.get('mode') === 'request') {
                    this.trigger("form:submit", data);
                }
            },

            getData: function () {
                var data = {};
                data.amount = this.$el.find('[name="amount"]').val();
                data.description = this.$el.find('#entity-description').val();
                data.transferDate = this.$el.find('#entity-transferDate').val();
                return data;
            },

            clearFormErrors: function () {
                var $form = this.$el;
                $form.find(".help-inline.error.transfer-field").each(function () {
                    $(this).remove();
                });
                $form.find(".control-group.error").each(function () {
                    $(this).removeClass("error");
                });
            },
            onFormDataInvalid: function (errors) {
                var $view = this.$el;
                var markErrors = function (value, key) {
                    var $controlGroup = $view.find("#entity-" + key).closest(".input-wrapper");
                    var $errorEl = $("<span>", {
                        class: "help-inline error transfer-field error-" + key,
                        text: value
                    });
                    $controlGroup.append($errorEl);
                }
                this.clearFormErrors();
                _.each(errors, markErrors);
            },
            removeError: function (key) {
                this.$el.find('.error.error-' + key).remove();
            }
        });

        Views.TransferDates = Marionette.ItemView.extend({
            className: 'transfer-dates-container',
            template: JST['assets/js/common/p2p/hypeTransfer/templates/transferDates.html'],
            initialize: function () { },
            transformDate: function (italianFormat) {
                return italianFormat.split('/')[2] + '-' + italianFormat.split('/')[1] + '-' + italianFormat.split('/')[0];
            },
            validateDates: function (transferData) {
                this.clearFormErrors();
                var pickerValue = this.$el.find('#entity-transferDate').val();
                if (pickerValue.indexOf('/') > -1 && pickerValue.split('/')[2].length === 4) {
                    pickerValue = this.transformDate(pickerValue);
                }
                var dateObject = new Date(pickerValue);
                var millisecondsDate = dateObject.getTime();
                var formattedDate = new moment(millisecondsDate).format('DD/MM/YYYY');
                if (millisecondsDate > this.model.get('millisecondsEnd') || millisecondsDate < this.model.get('millisecondsStart')) {
                    this.onFormDataInvalid({
                        transferDate: 'data non valida'
                    });
                } else if (dateObject.getDay() === 0 || dateObject.getDay() === 6) {
                    this.onFormDataInvalid({
                        transferDate: 'Non è possibile selezionare un sabato o domenica'
                    });
                } else {
                    this.trigger('date:submit', formattedDate, transferData);
                }
            },
            clearFormErrors: function () {
                this.$el.find(".help-inline.error").each(function () {
                    $(this).remove();
                });
                this.$el.find(".control-group.error").each(function () {
                    $(this).removeClass("error");
                });
            },
            onFormDataInvalid: function (errors) {
                var $view = this.$el;
                var markErrors = function (value, key) {
                    var $controlGroup = $view.find("#entity-" + key).closest(".input-wrapper");
                    var $errorEl = $("<span>", {
                        class: "help-inline error",
                        text: value
                    });
                    $controlGroup.append($errorEl);
                }
                this.clearFormErrors();
                _.each(errors, markErrors);
            }

        });
    }, Handlebars);
    return Appersonam.currentApp.HypeTransfer.Views;
});