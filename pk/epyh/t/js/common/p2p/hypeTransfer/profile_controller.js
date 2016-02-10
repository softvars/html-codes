define(["app",
    "common/authorize/profile_view",
    "common/keyboard/view",
    "common/p2p/hypeTransfer/profile_view",
    "common/confirm/profile_view",
    "iban"
], function(Appersonam, Authorize, Keyboard, FormView, Confirm) {
    Appersonam.module(Appersonam.currentApp.moduleName + ".HypeTransfer", function(HypeTransfer, Appersonam, Backbone, Marionette, $, _) {
        HypeTransfer.Controller = {
            profile: function(formDataContainer, mode, page, newContact) {
                if (!page) {
                    page = 2;
                }
                var self = this;
                this.splitAmount = false;
                self.peerFormOpen = false;
                self.searchLocked = false;
                require(["entities/p2p", "entities/movement", "entities/contact", "entities/user", 'entities/authorization', 'entities/financialSituation', "entities/file"], function() {
                    self.nonHyper = false;
                    self.peersCollection = formDataContainer.get('peersCollection');
                    var isIban = IBAN.isValid(self.peersCollection.first().get('destination').replace(/\s+/g, ''));
                    self.peersCollection.each(function(item, index, collection) {
                        if (item.get('hyper') === true) {
                            var id = item.get('id')
                            var fetchingImageEntity = Appersonam.request('movement:entity:new', {
                                mateReference: item.get('destination'),
                                subType: 'p2p'
                            }, false, id);
                            $.when(fetchingImageEntity).done(function(imageEntity) {
                                var itemToUpdate = self.peersCollection.get(imageEntity.get('itemId'));
                                if (itemToUpdate) { //itemToUpdate potrebbe essere stato cancellato nel frattempo
                                    itemToUpdate.set({
                                        imageValue: imageEntity.get('image')
                                    }, {
                                        silent: true
                                    });
                                    if (self.resumeView) {
                                        if (self.resumeView.collection.get(item.id)) {
                                            self.resumeView.collection.get(item.id).set({
                                                imageValue: ''
                                            }, {
                                                silent: true
                                            });
                                            self.resumeView.collection.get(item.id).set({
                                                imageValue: imageEntity.get('image')
                                            }, {
                                                silent: false
                                            });
                                        }
                                    }
                                }
                            });
                        } else {
                            self.nonHyper = true;
                        }
                    });

                    var fetchingUserImage = Appersonam.request("global:get:object", 'userImage');
                    $.when(fetchingUserImage).done(function(userImage) {
                        self.userImage = userImage;
                    });

                    self.transferMode = false;
                    if (mode === 'payment' && IBAN.isValid(self.peersCollection.first().get('destination'))) {
                        self.transferMode = true;
                    }
                    self.transferView = new FormView.Form({
                        newContact: newContact,
                        model: new Backbone.Model({
                            transferDate: formDataContainer.get('transferDate'),
                            description: formDataContainer.get('description'),
                            amount: formDataContainer.get('amount'),
                            mode: mode,
                            sts: Appersonam.CommonVariables['spendable'],
                            balance: Appersonam.CommonVariables['balance'],
                            scheduled: Appersonam.CommonVariables.scheduled,
                            savedForGoals: Appersonam.CommonVariables.savedForGoals,
                            isIban: isIban
                        })
                    });
                    var peersView = new FormView.PeersList({
                        collection: self.peersCollection,
                        model: new Backbone.Model({
                            mode: mode
                        })
                    });
                    self.transferView.on('split:amount', function(value) {
                        self.splitAmount = value;
                    });
                    self.transferView.on('show', function() {
                        this.peersRegion.show(peersView); //this in questo contesto è transferView
                        if (self.transferMode === true) {
                            this.$el.find('.js-transferDateContainer').show();
                        }
                        this.setPeersTitle(self.peersCollection.length);
                        //this.contactsRegion.show(contactsView);
                    });
                    self.transferView.on('back', function() {
                        var formData = self.transferView.getData();
                        if (mode === 'payment') {
                            formDataContainer.attributes.peersCollection.reset();
                        }
                        formDataContainer.set({
                            amount: ('' + formData.amount).replace('.', ','),
                            description: formData.description,
                            transferDate: formData.transferDate
                        });
                        Appersonam.currentApp.trigger("nav:back", '', 1);
                    });
                    peersView.on('update:collection', function(collection, actionType) {
                        var formData = self.transferView.getData();
                        self.transferView.datesRegion.close();
                        self.peersCollection = collection;
                        if (collection.length < 1) {
                            $('#panel_1').bind("webkitTransitionEnd", function() {
                                formDataContainer.set({
                                    amount: formData.amount,
                                    description: formData.description,
                                    transferDate: formData.transferDate
                                });
                                formDataContainer.attributes.peersCollection.reset(self.peersCollection.toJSON());
                                $('#panel_1').unbind("webkitTransitionEnd");
                            });
                            Appersonam.currentApp.trigger("nav:back", '', 1);
                        } else {
                            formDataContainer.attributes.peersCollection.reset(self.peersCollection.toJSON());
                            self.transferView.updateCheckbox(self.splitAmount);
                            self.transferView.setPeersTitle(self.peersCollection.length);
                        }
                    });
                    self.transferView.on("keyboard:show", function(value) {
                        var keyboard = new Keyboard.KeyboardWidget({
                            value: value
                        });
                        self.transferView.keyboardRegion.show(keyboard);
                        keyboard.on("keyboard:value:changed", function(data) {
                            self.transferView.setAmount(data, self.peersCollection.length);
                            if (parseFloat(data) >= 0.01 && parseInt(data) !== Infinity) {
                                self.transferView.removeError('amount');
                            }
                        });
                        keyboard.on("keyboard:close", function(data) {
                            try {
                                var value = self.transferView.model.get('amount');
                                if (parseFloat(value) >= 0.01 && parseInt(value) !== Infinity) {
                                    self.transferView.keyboardRegion.close();
                                }
                            } catch (ex) {
                                LogDB.log('errore p2p chiusura tastierino => ' + ex.message);
                            }
                        });
                    });
                    self.transferView.on("keyboard:close", function(data) {
                        try {
                            var value = self.transferView.model.get('amount');
                            if (parseFloat(value) >= 0.01 && parseInt(value) !== Infinity) {
                                self.transferView.keyboardRegion.close();
                            }
                        } catch (ex) {
                            LogDB.log('errore p2p chiusura tastierino => ' + ex.message);
                        }
                    });
                    self.transferView.on("form:submit", function(formData) {
                        formData.amount = formData.amount.replace(',', '.');
                        var totalAmount = formData.amount;
                        if (self.splitAmount === true) {
                            formData.amount = Math.round((formData.amount / self.peersCollection.length) * 100) / 100;
                        }
                        formData.instrumentValue = Appersonam.CommonVariables['myself'].idConto;

                        self.aliasIb = Appersonam.CommonVariables['myself'].aliasIb;
                        if (mode === 'payment') {
                            var transferObject = Appersonam.request("p2p:payment", formData, self.peersCollection.first());
                        } else {
                            var transferObject = Appersonam.request("p2p:request", formData, self.peersCollection);
                        }
                        var lastName = self.peersCollection.first().get('lastName');
                        var firstName = self.peersCollection.first().get('firstName');
                        var errors = transferObject.errors;
                        if ($.isEmptyObject(errors)) {
                            self.transferView.clearFormErrors();
                            if (self.transferMode === true) {
                                var transferData = {
                                    amount: formData.amount,
                                    description: formData.description,
                                    transferDate: formData.transferDate,
                                    destination: self.peersCollection.first().get('destination').toUpperCase(),
                                    lastName: lastName,
                                    firstName: firstName
                                };
                                //DEVO RIFARE LA SETBONIFICOINIT, NEL CASO SIANO CAMBIATI DESCRIZIONE O AMMONTARE
                                var fetchingIbanValidation = Appersonam.request("validate:transfer", transferData, Appersonam.CommonVariables['myself'].aliasIb);
                                $.when(fetchingIbanValidation).done(function(result) {
                                    if (result.errors) {
                                        self.transferView.triggerMethod("form:data:invalid", result.errors, '');
                                    } else {
                                        self.completeTransfer(transferData);
                                    }
                                });

                            } else {
                                self.transferView.datesRegion.close();
                                self.submitData(transferObject.model, mode, totalAmount);
                            }
                        } else {
                            self.transferView.triggerMethod("form:data:invalid", errors);
                            if (self.peerFormOpen) {
                                self.transferView.removeError('peer');
                            }
                        }
                    });
                    Appersonam.currentApp.trigger('show:main', self.transferView, page);
                    self.transferView.setAmount(formDataContainer.get('amount'), self.peersCollection.length);
                });
            },
            transferCheckDates: function(data, transferDates) {
                var self = this;
                var datesModel = Appersonam.request("transfer:dates", transferDates);
                self.datesView = new FormView.TransferDates({
                    model: datesModel
                });
                self.datesView.destination = data.destination;
                self.transferView.datesRegion.show(self.datesView);
                self.datesView.bind('date:submit', function(chosenDate, transferData) {
                    transferData.date = chosenDate;
                    self.completeTransfer(transferData);
                });
            },

            updateCollection: function(collection) {

            },

            transferPayment: function(data) {
                var self = this;
                var fetchingTransferDates = Appersonam.request("p2p:transfer:dates", data.destination);
                $.when(fetchingTransferDates).done(function(transferDates) {
                    ErrorMessage = transferDates.ErrorMessage;
                    if (ErrorMessage) {
                        self.showResult(false, 'Ricontrollare i dati inseriti.', '');
                        return false;
                    } else {
                        self.transferCheckDates(data, transferDates);
                    }
                });
            },

            completeTransfer: function(data) {
                var self = this;
                var completeTransferObject = Appersonam.request("p2p:transfer:model", data, self.aliasIb);
                self.submitData(completeTransferObject, 'transfer', completeTransferObject.get('amount'));
            },

            submitData: function(transferModel, mode, totalAmount) {
                var self = this;
                var userImgValue = null;
                var resumeModel = new Backbone.Model({
                    mode: mode,
                    myself: Appersonam.CommonVariables['myself'],
                    amount: transferModel.get('amount'),
                    totalAmount: totalAmount,
                    message: transferModel.get('description'),
                    userImgValue: self.userImage
                });
                var resumeCollection = new Backbone.Collection(self.peersCollection.toJSON());
                self.resumeView = new FormView.Resume({
                    model: resumeModel,
                    collection: resumeCollection
                });
                self.resumeView.on('cancel', function() {
                    self.transferView.removeBlur();
                    Appersonam.currentApp.trigger('close:overlay', '-resume');
                });
                self.resumeView.on('confirm', function() {
                    var transferModelData = transferModel.toJSON();
                    var totalAmount = parseFloat(transferModel.get('amount')) * self.peersCollection.length;
                    var singleAmount = parseFloat(transferModel.get('amount'));
                    transferModel.save(null, {
                        data: {
                            amount: transferModel.get('amount')
                        },
                        success: function(result) {
                            if (mode === 'request') {
                                //richiedo via P2P
                                var destinations = transferModel.get('senderAliasesType').senderAliasType;
                                var success = null;
                                if (result.get('Status').code === 'OK') {
                                    success = true;
                                } else {
                                    success = false;
                                }
                                var TransactionDetail = result.get('TransactionDetail');
                                var errorString = '';
                                if (TransactionDetail.length < 1) {
                                    errorString = 'La transazione non è andata a buon fine, ricontrollare i dati inseriti.';
                                } else {
                                    errorString = 'Si è verificato un problema con i seguenti destinatari:';
                                }
                                var successTitle = 'Richiesta inviata con successo';
                                for (var j = 0; j < TransactionDetail.length; j++) {
                                    var item = TransactionDetail[j].status;
                                    if (!(item.code === 'REQUESTED_OK')) {
                                        success = false;
                                        errorString += ' ' + destinations[j].aliasValue;
                                    }
                                }
                                if (success === true) {
                                    if (self.nonHyper) {
                                        var transactionSubtitle = "Il nuovo contatto ricever&agrave; la notifica di richiesta denaro e l'invito di registrazione ad Hype. Il ricevente ha 10 giorni per accettare, terminati i quali l'invio di denaro sar&agrave; cancellato.";
                                    } else {
                                        var transactionSubtitle = 'Il contatto ricever&agrave; la notifica di richiesta denaro.';
                                    }

                                    self.showResult(true, transactionSubtitle, successTitle);
                                    
                                        //log di avvenuta transazione
                                        Appersonam.request('tracking:log:event', 'p2p_completed',
                                        {
                                            'peersCount': self.peersCollection.length.toString(),
                                            'singleAmount': singleAmount.toString(),
                                            'type': 'request'
                                        },
                                        totalAmount.toString());

                                } else {
                                    transferModel.clear();
                                    transferModel.set(transferModelData, {
                                        silent: true
                                    });
                                    self.showResult(false, errorString, '');
                                }
                            } else {
                                var ErrorMessage = result.get('ErrorMessage');
                                if (!ErrorMessage) {
                                    var successTitle = 'Hai inviato i soldi';
                                    var transactionSubtitle = "Ora ne hai un po’ meno da spendere.";
                                    if (mode === 'transfer') {
                                        //ok da bonifico
                                        self.showResult(true, transactionSubtitle, successTitle);

                                        //log di avvenuta transazione
                                        Appersonam.request('tracking:log:event', 'p2p_completed',
                                        {
                                            'peersCount': '1',
                                            'singleAmount': singleAmount.toString(),
                                            'type': 'money_transfer'
                                        },
                                        totalAmount.toString());

                                    } else { //risposta da p2p
                                        var status = result.get('status');
                                        if (status.code === 'OK') {
                                            if (self.nonHyper) {
                                                successTitle = 'Hai inviato i soldi';
                                                transactionSubtitle = "Ora ne hai un po’ meno da spendere.";
                                            }
                                            self.showResult(true, transactionSubtitle, successTitle);

                                        //log di avvenuta transazione
                                        Appersonam.request('tracking:log:event', 'p2p_completed',
                                        {
                                            'peersCount': self.peersCollection.length.toString(),
                                            'singleAmount': singleAmount.toString(),
                                            'type': 'send'
                                        },
                                        totalAmount.toString());

                                        } else {
                                            //fail p2p
                                            transferModel.clear();
                                            transferModel.set(transferModelData, {
                                                silent: true
                                            });
                                            self.showResult(false, status.description, '');
                                        }
                                    }
                                } else {
                                    //serve autorizzazione o errore bonifico
                                    var errorCode = ErrorMessage[0].errorCode;
                                    transferModel.unset('ErrorMessage');
                                    self.authorize(errorCode, transferModel, mode);
                                }
                            }
                            self.resumeView.triggerMethod('set:lock:button', false);
                        },
                        error: function(data) {
                            transferModel.clear();
                            transferModel.set(transferModelData, {
                                silent: true
                            });
                            self.resumeView.triggerMethod('set:lock:button', false);
                        }
                    });
                });
                this.transferView.addBlur();
                Appersonam.currentApp.trigger('show:overlay', self.resumeView, '-resume');
            },
            showResult: function(success, message, title) {
                var self = this;
                if (success === true) {
                    if (!title) {
                        title = 'Invio eseguito con successo';
                    }
                    //var media = document.getElementById("coins");
                    //media.play();

                    //media = new Media("./assets/sounds/coins.wav", function(){ console.log("ok") });
                    //media.play();

                    var confirmModel = new Backbone.Model({
                        header: 'Grande!',
                        title: title,
                        description: message,
                        button: 'Torna ai movimenti',
                        className: 'receipt-dialog',
                        closeButton: 'none'
                    });
                } else {
                    var confirmModel = new Backbone.Model({
                        title: 'Si è verificato un errore',
                        description: message,
                        className: 'confirmation-dialog-danger',
                    });
                }
                var confirmPanel = new Confirm.Profile({
                    model: confirmModel
                });
                confirmPanel.on("cancel", function() {
                    self.transferView.removeBlur();
                    Appersonam.currentApp.trigger('close:overlay');
                });
                confirmPanel.on("confirm", function() {
                    self.returnToMain();
                });
                self.transferView.addBlur();
                Appersonam.currentApp.trigger('show:overlay', confirmPanel);
                Appersonam.currentApp.trigger('panelManager:onBackFunction', self.returnToMain);
            },

            returnToMain: function() {
                Appersonam.trigger('reset:loading');
                Appersonam.trigger('show:loading');
                setTimeout(function() {
                    $('.blurred-element').removeClass('blurred-element');
                    Appersonam.currentApp.trigger('close:overlay');
                    self.userImgEntity = undefined; //rimuovo dalla memoria l'immagine utente
                    Appersonam.trigger('activities', 'movements:list', true);
                    Appersonam.NavigationApp.trigger('set:selected', 'movements', 1);
                }, 600);
            },


            authorize: function(errorCode, transferModel, mode) {
                var self = this;
                var authorizationModel;
                switch (errorCode) {
                    case "690":
                        authorizationModel = Appersonam.request("authorization:entity", true, false); //solo pin
                        break;
                    case "691":
                        authorizationModel = Appersonam.request("authorization:entity", false, true); //solo pwd
                        break;
                    case "692":
                        authorizationModel = Appersonam.request("authorization:entity", true, true); //pin e pwd
                        break;
                    default:
                        self.showResult(false, self.errorCodesMap['000'], '');
                        return false;
                        break;
                }
                var pinView = new Authorize.Pin({
                    model: authorizationModel
                });
                pinView.on('close', function() {
                    pinView.triggerMethod('set:lock:button', false);
                    Appersonam.currentApp.trigger('close:overlay', '-pin');
                });
                pinView.on('form:submit', function(data) {
                    data.amount = transferModel.get('amount');
                    var transferModelData = transferModel.toJSON();
                    transferModel.save(null, {
                        data: data,
                        success: function(result) {
                            var ErrorMessage = result.get('ErrorMessage');
                            if (ErrorMessage) {
                                //errore auth
                                var authError = ErrorMessage[0].errorCode;
                                if (authError === '694' || authError === '693') {
                                    //pin o pwd non corretti
                                    if (authorizationModel.get('password') === true) {
                                        //se richiesta anche la password, l'errore riguarda pin o password
                                        authError = '694';
                                    }
                                    self.showResult(false, self.errorCodesMap[authError], '');
                                    transferModel.clear();
                                    transferModel.set(transferModelData, {
                                        silent: true
                                    });
                                } else {
                                    //errore bonifico
                                    self.showResult(false, self.errorCodesMap['000'], '');
                                    transferModel.clear();
                                    transferModel.set(transferModelData, {
                                        silent: true
                                    });
                                }
                            } else {
                                if (mode === 'transfer') {
                                    //nessun errore bonifico
                                    self.showResult(true), '', '';

                                } else {
                                    //risposta da p2p
                                    var status = result.get('status');
                                    if (status.code === 'OK') {
                                        self.showResult(true, '', '');

                                    } else {
                                        transferModel.clear();
                                        transferModel.set(transferModelData, {
                                            silent: true
                                        });
                                        self.showResult(status.description, '', '');
                                    }
                                }
                            }
                            pinView.close();
                        },
                        error: function(data) {
                            transferModel.clear();
                            transferModel.set(transferModelData, {
                                silent: true
                            });
                            pinView.close();
                        }
                    });
                });
                self.transferView.addBlur();
                Appersonam.currentApp.trigger('show:overlay', pinView, '-pin');
            },
            errorCodesMap: {
                '693': 'La password inserita non è valida',
                '694': 'La password o il codice sms non sono validi',
                '000': 'Si è verificato un errore tecnico. Riprovare più tardi.'
            }
        };
    });
    return Appersonam.currentApp.HypeTransfer.Controller;
});
