define(["app",
    "apps/card/recharge/profile/profile_view",
    "common/confirm/profile_view",
    "common/keyboard/view",
    "common/combo/list/list_view"
], function(Appersonam, View, Confirm, Keyboard, Combo) {
    Appersonam.module("CardApp.RechargeProfile", function(RechargeProfile, Appersonam, Backbone, Marionette, $, _) {
        RechargeProfile.Controller = {
            unsetBackButtonHandler: function(ctx) {
                Appersonam.CardApp.trigger('close:overlay', '-cardoptions');
                Appersonam.off('back:button:clicked', ctx.unsetBackButtonHandler);
                Appersonam.CommonVariables.locked = false;
            },

            onProfileViewSubmitData: function(entity, successCallback, errorCallback, options) {
                var errors = entity.validate(entity.toJSON(), options);
                if (!_.isEmpty(errors)) {
                    errorCallback(errors);
                } else {
                    successCallback();
                }
            },

            onProfileViewKeyboardClose: function(data, profileView, cardFormView) {
                try {
                    var value = profileView.amount;
                    if (parseFloat(value) >= 0.01 && parseInt(value) !== Infinity) {
                        profileView.keyboardRegion.close();
                        profileView.toggleScroll(); //per evitare che sotto la tastiera si veda il resto della view
                    }
                } catch (ex) {
                    LogDB.log('errore ricarica carta chiusura tastierino => ' + ex.message);
                }
            },

            onProfileViewKeyboardShow: function(value, profileView, cardFormView) {
                var that = this;
                var keyboard = new Keyboard.KeyboardWidget({
                    value: value
                });
                profileView.keyboardRegion.show(keyboard);
                profileView.toggleScroll(); //per evitare che sotto la tastiera si veda il resto della view
                keyboard.on("keyboard:value:changed", function(data) {
                    profileView.setAmount(data);
                    if (parseFloat(data) >= 0.01 && parseInt(data) !== Infinity) {
                        profileView.removeError('amount');
                    }
                });
                keyboard.on("keyboard:close", function(data) {
                    try {
                        var value = profileView.amount;
                        if (parseFloat(value) >= 0.01 && parseInt(value) !== Infinity) {
                            profileView.keyboardRegion.close();
                            profileView.toggleScroll(); //per evitare che sotto la tastiera si veda il resto della view
                        }
                    } catch (ex) {
                        LogDB.log('errore ricarica carta chiusura tastierino => ' + ex.message);
                    }
                });
            },

            onProfileViewCombo: function(target, collection, cardFormView, profileView) {
                var that = this;
                var comboView = new Combo.ComboItemsView({
                    model: collection.first(),
                    collection: collection,
                    selectFirstItem: false,
                    valueName: 'value',
                    textName: 'text',
                    title: ' '
                });
                comboView.on('show', function() {
                    this.showItems();
                });
                comboView.on('item:selected', function(model) {
                    cardFormView.triggerMethod('setValue', target, model.get('value'), model.get('text'));
                    profileView.removeBlur();
                    that.unsetBackButtonHandler(that);
                });
                comboView.on('close:combo', function() {
                    that.unsetBackButtonHandler(that);
                    profileView.removeBlur();
                });
                Appersonam.on('back', function() {
                    profileView.removeBlur();
                    that.unsetBackButtonHandler(that);
                });
                profileView.addBlur();
                Appersonam.CommonVariables.locked = true;
                Appersonam.CardApp.trigger('show:overlay', comboView, '-cardoptions');
            },

            showResult: function(success, header, title, description, resumeView, profileView) {
                var that = this;
                if (success === true) {
                    var confirmModel = new Backbone.Model({
                        header: header,
                        title: title,
                        button: 'TORNA AI MOVIMENTI',
                        description: description,
                        className: 'receipt-dialog scrollable',
                        closeButton: 'none'
                    });
                } else {
                    var confirmModel = new Backbone.Model({
                        title: 'Si è verificato un errore',
                        description: 'Per favore, riprova dopo aver controllato i dati inseriti',
                        className: 'confirmation-dialog-danger',
                    });
                    profileView.addBlur();
                }
                confirmPanel = new Confirm.Profile({
                    model: confirmModel
                });
                confirmPanel.on("cancel", function() {
                    profileView.removeBlur();
                    Appersonam.CardApp.trigger('close:overlay', '_cardmessage');
                });
                confirmPanel.on("confirm", function() {
                    profileView.removeBlur();
                    that.returnToMain();
                });
                confirmPanel.on('close', function() {
                    profileView.removeBlur();
                    resumeView.close();
                });
                Appersonam.CardApp.trigger('show:overlay', confirmPanel, '_cardmessage');
            },

            createOrEditCard: function(originalModel, cardsList) { //SCHERMATA PROFILO CARTA
                //originalModel è il modello della carta già esistente che sto editando
                var that = this;
                //var splittedCardNumber = cardProfileModel.get('cardNumber').match(/[\s\S]{1,4}/g) || [];*/
                var cardFormView = new View.CardFormView({
                    model: new Backbone.Model(originalModel.toJSON())
                });
                cardFormView.on('combo', function(target, collection) {
                    that.onProfileViewCombo(target, collection, cardFormView, cardFormContainerView);
                });
                var cardFormContainerView = new View.CardEditContainerView({
                    model: new Backbone.Model({
                        id: originalModel.id
                    })
                });
                cardFormContainerView.on('back', function() {
                    Appersonam.CardApp.trigger('nav:back', '', 1);
                });
                cardFormContainerView.on('show', function() {
                    this.formRegion.show(cardFormView);
                });
                cardFormContainerView.on('delete', function(data) {
                    that.deleteCard(this, originalModel, cardsList);
                });
                cardFormContainerView.on('submit', function(data) {
                    delete data.amount;
                    data.id = originalModel.id;
                    var cardProfileModel = Appersonam.request('card:new', data);
                    var errorCallback = function(errors) { //validazione ko
                        cardFormContainerView.triggerMethod("form:data:invalid", errors);
                    };
                    var successCallback = function() { //validazione ok
                        cardProfileModel.set(data, {
                            silent: true
                        });
                        cardProfileModel.set('preferred', true);
                        that.threeDSAuthorization(cardProfileModel, cardFormContainerView);
                    };
                    this.clearFormErrors();
                    that.onProfileViewSubmitData(cardProfileModel, successCallback, errorCallback); //validazione
                });
                Appersonam.CardApp.trigger('show:main', cardFormContainerView, 2);
            },

            deleteCard: function(profileView, cardModel, cardsList) {
                var that = this;
                var confirmModel = new Backbone.Model({
                    title: "Stai per eliminare la carta salvata.",
                    description: "Se elimini la carta, dovrai inserire i dati della carta alla prossima ricarica di HYPE ed effettuare nuovamente la verifica 3D Secure. ",
                    button: 'Conferma Eliminazione',
                    className: 'confirmation-dialog-danger',
                });

                var confirmPanel = new Confirm.Profile({
                    model: confirmModel
                });

                var confirmCallback = function() {
                    cardModel.destroy();
                    Appersonam.request('tracking:log:event', 'card_deleted');
                    confirmPanel.close();
                    profileView.back();
                    that.myCards(null, cardsList.clone());
                    cardsList = null; //elimino la lista per il garbage collector ed evitare referenze circolari
                };

                confirmPanel.on('show', function() {
                    profileView.addBlur();
                });
                confirmPanel.on('cancel', function() {
                    profileView.removeBlur();
                    confirmPanel.close();
                });
                confirmPanel.on('confirm', function() {
                    confirmCallback();
                });
                Appersonam.CardApp.trigger('show:overlay', confirmPanel, '-resume');
            },

            myCards: function(dataFrom3DS, updatedCardsList) {
                var that = this;
                require(["entities/card"], function() {
                    var fetchingCardsList = Appersonam.request('cards:list', updatedCardsList);
                    var cardCreateEntity = Appersonam.request("card:new");
                    var myCardsView = new View.MyCardsView({
                        model: new Backbone.Model()
                    });
                    myCardsView.on('corner:menu', function() {
                        Appersonam.NavigationApp.trigger('corner:menu');
                    });
                    $.when(fetchingCardsList).done(function(cardsList) {
                        if (cardsList.length < 1) {
                            myCardsView.model.set({
                                newCard: true
                            });
                            var newCardView = new View.CardFormView({
                                model: new Backbone.Model({
                                    newCard: true
                                })
                            });
                            newCardView.on('combo', function(target, collection) {
                                that.onProfileViewCombo(target, collection, newCardView, myCardsView);
                            });
                            myCardsView.on('show', function() {
                                this.contentRegion.show(newCardView);
                            });
                            myCardsView.on('submit', function(formData) {
                                delete formData.amount;
                                formData.id = undefined;
                                var cardProfileModel = Appersonam.request('card:new', formData);
                                var errorCallback = function(errors) { //validazione ko
                                    myCardsView.triggerMethod("form:data:invalid", errors);
                                };
                                var successCallback = function() { //validazione ok
                                    cardProfileModel.set(formData, {
                                        silent: true
                                    });
                                    cardProfileModel.set('preferred', true);
                                    that.threeDSAuthorization(cardProfileModel, myCardsView);
                                };
                                this.clearFormErrors();
                                that.onProfileViewSubmitData(cardProfileModel, successCallback, errorCallback); //validazione
                            });
                            Appersonam.CardApp.trigger('show:main', myCardsView, 1);
                        } else {
                            var cardsListView = new View.ListView({
                                collection: cardsList,
                                renderOnChange: true
                            });
                            myCardsView.on('show', function() {
                                this.contentRegion.show(cardsListView);
                            });
                            cardsListView.on('itemview:selected', function(itemView) {
                                that.createOrEditCard(itemView.model, cardsList);
                            });
                            myCardsView.on('add:card', function() {
                                that.createOrEditCard(new Backbone.Model({
                                    cardNumber: '',
                                    cvv: '',
                                    expiryMonth: '01',
                                    expiryYear: new Date().getFullYear().toString().substring(2, 4)
                                }), cardsList);
                            });
                            Appersonam.CardApp.trigger('show:main', myCardsView, 1);
                        }
                        if (!!dataFrom3DS) {
                            if (dataFrom3DS.statusMsg.toLowerCase() === 'ok') {
                                var resultModel = new Backbone.Model({
                                    header: 'hidden',
                                    title: 'Carta collegata con successo',
                                    description: 'Puoi utilizzare la carta per ricaricare HYPE!',
                                    button: 'TORNA AL MENU',
                                    className: 'receipt-dialog scrollable',
                                    topImage: 'can-save',
                                    hideCross: true
                                });
                                var okCallback = function() {
                                    delete Appersonam.CommonVariables.ThreeDSCard;
                                    Appersonam.CommonVariables.loggingOut = false;
                                    that.myCards(null, cardsList.clone());
                                    cardsList = null; //elimino la lista per il garbage collector ed evitare referenze circolari
                                };
                                that.showGenericResult(resultModel, okCallback);
                                Appersonam.request('tracking:log:event', 'new_card_added');
                            } else {
                                var description = 'Non &egrave; stato possibile procedere al collegamento. Cotrolla i <strong>dati</strong> inseriti.'
                                if (!!dataFrom3DS.statusCode && that.addCardErrorMap[dataFrom3DS.statusCode]) {
                                    description = that.addCardErrorMap[dataFrom3DS.statusCode];
                                }
                                var resultModel = new Backbone.Model({
                                    header: 'hidden',
                                    title: 'Carta NON Collegabile ad HYPE',
                                    description: description,
                                    button: 'TORNA AL MENU',
                                    className: 'receipt-dialog scrollable',
                                    topImage: 'cannot-save',
                                    hideCross: true
                                });
                                that.showGenericResult(resultModel);
                                that.myCards(null, cardsList.clone());
                                cardsList = null; //elimino la lista per il garbage collector ed evitare referenze circolari
                            }
                            setTimeout(function() {
                                Appersonam.NavigationApp.trigger('corner:menu');
                            }, 1500);
                        }
                    });
                }); //LISTA DELLE CARTE
            },

            rechargeProfile: function(dataFrom3DS, updatedCardsList) { //SCHERMATA RICARICA CON CARTA (ESISTENTE O NUOVA)
                var that = this;
                require(["entities/card"], function() {
                    var fetchingCardsList = Appersonam.request('cards:list', updatedCardsList);
                    $.when(fetchingCardsList).done(function(cardsList) {
                        var rechargeEntity = new Backbone.Model();
                        var cardFormView = new View.CardFormView({
                            model: new Backbone.Model({
                                noCards: cardsList.length < 1,
                                amount: 0,
                                recharging: true
                            })
                        });
                        var profileView = new View.ProfileView({
                            model: rechargeEntity
                        });
                        //CARDFORMVIEW = FORM PER RICARICARE CARTA
                        //PROFILEVIEW = VIEW ESTERNA CHE CONTIENE CARDFORMVIEW ETC
                        cardFormView.on('combo', function(target, collection) {
                            that.onProfileViewCombo(target, collection, cardFormView, profileView);
                        });
                        profileView.on('keyboard:show', function(value) {
                            that.onProfileViewKeyboardShow(value, this, cardFormView);
                        });
                        profileView.on('keyboard:close', function(data) {
                            that.onProfileViewKeyboardClose(data, this, cardFormView);
                        });
                        profileView.on('back', function() {
                            Appersonam.CardApp.trigger('nav:back', '', 1);
                        });
                        profileView.on('show', function() {
                            this.formRegion.show(cardFormView);
                            that.showDefaultCard(cardsList, this, cardFormView, rechargeEntity);
                        });
                        Appersonam.CardApp.trigger('show:main', profileView, 2);
                        if (!!dataFrom3DS) {
                            that.show3DSRechargeResult(dataFrom3DS, cardsList);
                        }
                    });
                });
            },

            showDefaultCard: function(cardsList, profileView, cardFormView, rechargeEntity) {
                //CARDFORMVIEW = FORM PER RICARICARE CARTA
                //PROFILEVIEW = VIEW ESTERNA CHE CONTIENE CARDFORMVIEW ETC
                var that = this;
                if (cardsList.length > 0) {
                    var defaultCardView = new View.ListItemView({
                        model: cardsList.first().clone()
                    });
                    if (cardsList.length > 1) {
                        defaultCardView.model.set({
                            moreCards: true
                        });
                        defaultCardView.on('selected', function() {
                            that.showCardsList(defaultCardView, cardsList, profileView);
                        });
                    }
                    profileView.defaultCardRegion.show(defaultCardView);
                } else {
                    profileView.hideDefaultCard();
                }
                profileView.on('submit', function(formData) {
                    var rechargeEntity = null;
                    var maskedPan = ''; //MASKED PAN SERVE SOLO PER ESSERE MOSTRATO NELL'ANTEPRIMA DELLA RICARICA
                    if (!this.newCard) { //VALORE CHE LA VIEW STESSA IMPOSTA QUANDO AVVIENE LO SLIDETOGGLE
                        formData = { //IN CASO DI RICARICA GIA' ESISTENTE SERVE SOLO L'AMOUNT E L'ID DELLA CARTA
                            amount: formData.amount,
                            id: defaultCardView.model.id,
                        };
                        maskedPan = defaultCardView.model.get('maskedPan');
                        rechargeEntity = Appersonam.request("card:recharge:entity", formData);
                    } else { //CARTA NON ESISTENTE
                        maskedPan = maskPan(formData.cardNumber);
                        rechargeEntity = Appersonam.request("card:new", formData);
                    }
                    var errorCallback = function(errors) {
                        profileView.triggerMethod("form:data:invalid", errors);
                    };
                    var successCallback = function() {
                        rechargeEntity.set(formData);
                        //confirmRecharge = funzione per alert di conferma ricarica 
                        that.confirmRecharge(rechargeEntity, profileView, maskedPan);
                    };
                    //onProfileViewSubmitData = funzione per la validazione del form
                    this.clearFormErrors();
                    that.onProfileViewSubmitData(rechargeEntity, successCallback, errorCallback, {
                        recharging: true
                    });
                }); //MOSTRA CARTA DI DEFAULT PER RICARICA
            },

            showCardsList: function(defaultCardView, cardsList, profileView) {
                var that = this;
                var listView = new View.ListView({
                    collection: cardsList,
                    model: new Backbone.Model({
                        mode: 'selection-mode'
                    })
                });

                var cardSelectView = new View.CardSelectView();

                var navBack = function() {
                    Appersonam.CardApp.trigger('nav:back', '', 2);
                };

                listView.on('itemview:selected', function(itemView) {
                    defaultCardView.model.set(itemView.model.toJSON());
                    defaultCardView.render();
                    navBack();
                });

                cardSelectView.on('show', function() {
                    this.cardsListRegion.show(listView);
                });
                cardSelectView.on('back', function() {
                    navBack();
                });
                Appersonam.CardApp.trigger('show:main', cardSelectView, 3); //SCHERMATA LISTA CARTE PER RICARICA
            },

            show3DSAlert: function(confirmCallback, cancelCallback, resumeView) {
                var confirmModel = new Backbone.Model({
                    title: "Verifica 3D SECURE della Carta",
                    description: "Procedi alla verifica 3D SECURE della carta per ricaricare HYPE <br /><br /> I servizi MasterCard SecureCode e Verified by Visa" +
                        "sono protocolli di sicurezza che garantiscono una maggiore tutela delle transazioni online",
                    button: 'PROCEDI ALLA VERIFICA',
                    header: 'VERIFICA 3D SECURE',
                    className: 'confirmation-dialog-safe',
                });

                var confirmPanel = new Confirm.Profile({
                    model: confirmModel
                });
                confirmPanel.on('show', function() {
                    if (resumeView) {
                        resumeView.close();
                    }
                });
                confirmPanel.on('cancel', function() {
                    cancelCallback();
                });
                confirmPanel.on('confirm', function() {
                    confirmCallback();
                });
                confirmPanel.on('close', function() {
                    Appersonam.CommonVariables.loggingOut = false;
                });
                Appersonam.CardApp.trigger('show:overlay', confirmPanel, '-resume');
            },

            onCardRechargeConfirm: function(submitModel, resumeView, profileView) { //RICARICA CARTA GIA ESISTENTE
                var that = this;
                var okModel = new Backbone.Model({
                    header: 'hidden',
                    title: 'Ricarica effettuata con successo',
                    button: 'TORNA AI MOVIMENTI',
                    description: 'l&#39; importo di <strong>&euro;' + submitModel.get('amount') + '</strong> &egrave; stato correttamente trasferito sulla tua Carta HYPE',
                    className: 'receipt-dialog scrollable',
                    closeButton: 'none',
                    topImage: 'recharge-ok'
                });

                var koModel = new Backbone.Model({
                    header: 'hidden',
                    title: 'Ricarica non eseguita',
                    description: 'Non &egrave; stato possibile procedere alla ricarica. Cotrolla i <strong>dati</strong> inseriti.',
                    className: 'receipt-dialog scrollable',
                    topImage: 'recharge-ko',
                    closeButton: 'none',
                    button: 'TORNA AL MENU'
                });
                profileView.addBlur();

                var confirmFunction = function() {
                    profileView.removeBlur();
                    that.returnToMain();
                };
                var cancelFunction = function() {
                    profileView.removeBlur();
                };
                submitModel.save(null, {
                    withoutMethods: true,
                    recharging: true,
                    validate: false,
                    success: function(resultData) {
                        var statusMsg = resultData.get('statusMsg');
                        if (statusMsg && statusMsg.toLowerCase() === 'ok') {
                            that.showGenericResult(okModel, confirmFunction, cancelFunction);
                            Appersonam.request('tracking:log:event', 'card_recharge_completed');
                            resumeView.close();
                        } else {
                            resumeView.close();
                            that.showGenericResult(koModel, cancelFunction, cancelFunction);
                        }
                    },
                    error: function(resultData) { //il success di default mostrerà la schermata rossa, quindi chiudo la view di resume e tolgo il blur da quella del form
                        resumeView.close();
                        //that.showResult(false, '', '', '', resumeView, profileView);
                    }
                });
            },

            returnToMain: function() {
                Appersonam.trigger('reset:loading');
                Appersonam.trigger('show:loading');
                setTimeout(function() {
                    $('.blurred-element').removeClass('blurred-element');
                    Appersonam.CardApp.trigger('close:overlay', '_cardmessage');
                    Appersonam.trigger('activities', 'movements:list', true);
                }, 600);
            },

            addCardToCollection: function(successCallback, errorCallback) { //AGGIUNGE UNA CARTA RIENTRANDO DAL 3DS
                var cardToAddData = Appersonam.CommonVariables.ThreeDSCard.cardData;
                delete Appersonam.CommonVariables.ThreeDSCard;
                Appersonam.CommonVariables.loggingOut = false;
                //se vengo da una ricarica devo eliminare questi parametri di troppo
                delete cardToAddData.description;
                delete cardToAddData.cvv;
                delete cardToAddData.amount;
                delete cardToAddData.channel;
                delete cardToAddData.email;
                //e aggiungere il preferred
                cardToAddData.preferred = true;
                var that = this;
                newCardEntity = Appersonam.request('card:new', cardToAddData);
                Appersonam.trigger('show:loading');

                var addSuccess = function(data) {
                    var resultModel = new Backbone.Model({
                        header: 'hidden',
                        title: 'Carta collegata con successo',
                        description: 'Puoi utilizzare la carta per ricaricare HYPE!',
                        button: 'TORNA AL MENU',
                        className: 'receipt-dialog scrollable',
                        topImage: 'can-save',
                        hideCross: true
                    });
                    if (!!successCallback) {
                        successCallback(data);
                    }
                    that.showGenericResult(resultModel);
                };
                var addError = function(data, description) {
                    var resultModel = new Backbone.Model({
                        header: 'hidden',
                        title: 'Carta NON Collegabile ad HYPE',
                        description: description,
                        button: 'TORNA AL MENU',
                        className: 'receipt-dialog scrollable',
                        topImage: 'cannot-save',
                        hideCross: true
                    });
                    if (!!errorCallback) {
                        errorCallback(data);
                    }
                    that.showGenericResult(resultModel);
                };
                newCardEntity.save(null, {
                    validate: false,
                    success: function(resultData) {
                        Appersonam.trigger('reset:loading');
                        console.log(resultData);
                        if (resultData.get('statusMsg') === 'OK') {
                            Appersonam.request('tracking:log:event', 'new_card_added');
                            addSuccess({
                                id: parseFloat(resultData.get('id')),
                                cardAlias: cardToAddData.cardAlias,
                                expiryMonth: cardToAddData.expiryMonth,
                                expiriYear: cardToAddData.expiriYear,
                                circuitName: cardToAddData.circuitName,
                                preferred: true,
                                maskedPan: maskPan(cardToAddData.cardNumber),
                            });
                        } else {
                            var description = 'Non &egrave; stato possibile procedere al collegamento. Cotrolla i <strong>dati</strong> inseriti.';
                            if (!!resultData.get('statusCode') && that.addCardErrorMap[resultData.get('statusCode')]) {
                                description = that.addCardErrorMap[resultData.get('statusCode')];
                            }
                            addError(resultData, description);
                        }
                    },
                    error: function(resultData) {
                        Appersonam.trigger('reset:loading');
                        console.log(resultData);
                        addError(resultData, 'Non &egrave; stato possibile procedere al collegamento. Cotrolla i <strong>dati</strong> inseriti.');
                    }
                });
            },

            showGenericResult: function(resultModel, okCallback, koCallback) {
                var genericResultView = new Confirm.Profile({
                    model: resultModel
                });
                genericResultView.on('confirm', function(data) {
                    Appersonam.CardApp.trigger('close:overlay', '-genericResult');
                    if (!!okCallback) {
                        okCallback(data);
                    }
                });
                genericResultView.on('cancel', function(data) {
                    Appersonam.CardApp.trigger('close:overlay', '-genericResult');
                    if (!!koCallback) {
                        koCallback(data);
                    }
                });
                genericResultView.on('show', function() {
                    Appersonam.trigger('reset:loading');
                });
                Appersonam.CardApp.trigger('show:overlay', genericResultView, '-genericResult');
            },

            show3DSRechargeResult: function(dataFrom3DS, myCardsList) {
                var that = this;
                var amount = Appersonam.CommonVariables.ThreeDSCard.cardData.amount;
                var threeDSResultModel = new Backbone.Model();
                if (dataFrom3DS.statusMsg.toLowerCase() === 'ok') {
                    Appersonam.request('tracking:log:event', 'new_card_recharge_completed');
                    if (dataFrom3DS.addCardFlag === 'true') {
                        threeDSResultModel.set({
                            header: 'hidden',
                            title: 'Ricarica eseguita con successo',
                            description: 'l&#39; importo di <strong>&euro;' + amount + '</strong> &egrave; stato correttamente trasferito sulla tua Carta HYPE',
                            subDescription: 'Puoi salvare questa carta <strong>in HYPE per le ricariche future</strong> <br /> Vuoi salvare la tua Carta in HYPE?',
                            button: 'SALVA LA CARTA IN HYPE',
                            className: 'receipt-dialog scrollable',
                            deny: 'NON SALVARE LA CARTA IN HYPE',
                            image: 'can-save',
                            topImage: 'recharge-ok',
                            hideCross: true
                        });
                    } else {
                        threeDSResultModel.set({
                            header: 'hidden',
                            title: 'Ricarica eseguita con successo',
                            description: 'l&#39; importo di <strong>&euro;' + amount + '</strong> &egrave; stato correttamente trasferito sulla tua Carta HYPE',
                            subDescription: 'Questa carta &egrave; gi&agrave; salvata da <strong>un altro utente in HYPE</strong>, oppurenon ha i <strong>requisiti 3DSecure</strong> per essere collegata all&#39;Applicazione. <br /><br />Non pu&ograve; quindi essere salvata per le tue ricariche in futuro',
                            button: 'TORNA AL MENU',
                            className: 'receipt-dialog scrollable',
                            image: 'cannot-save',
                            topImage: 'recharge-ok',
                            hideCross: true
                        });
                    }
                } else {
                    threeDSResultModel.set({
                        header: 'hidden',
                        title: 'Ricarica non eseguita',
                        description: 'Non &egrave; stato possibile procedere alla ricarica. Cotrolla i <strong>dati</strong> inseriti.',
                        button: 'TORNA AL MENU',
                        className: 'receipt-dialog scrollable',
                        topImage: 'recharge-ko',
                        hideCross: true
                    });
                }
                var addCardSuccess = function(newCardData) {
                    myCardsList.add(newCardData);
                    //aggiorno tutta la pagina
                    that.rechargeProfile(null, myCardsList.clone());
                    myCardsList = null; //elimino la lista per il garbage collector ed evitare referenze circolari
                    Appersonam.CardApp.trigger('close:overlay', '-3dsresult');
                };
                var addCardFailure = function() {
                    Appersonam.CardApp.trigger('close:overlay', '-3dsresult');
                };

                var okCallback = function() { // l'utente decide di salvare la carta
                    that.addCardToCollection(addCardSuccess, addCardFailure);
                    Appersonam.CardApp.trigger('close:overlay', '-3dsresult');
                };
                var koCallback = function() { //l'utente non salva la carta
                    delete Appersonam.CommonVariables.ThreeDSCard;
                    Appersonam.CardApp.trigger('close:overlay', '-3dsresult');
                };
                if (dataFrom3DS.addCardFlag !== 'true') { //se non posso aggiungere la carta, alla chiusura della finestra non chiamo il servizio
                    okCallback = koCallback;
                }
                setTimeout(function() {
                    Appersonam.NavigationApp.trigger('corner:menu');
                    that.showGenericResult(threeDSResultModel, okCallback, koCallback);
                }, 1500);
            },
            confirmRecharge: function(submitModel, profileView, maskedPan) {
                var that = this;
                var resumeModel = new Backbone.Model({
                    amount: submitModel.get('amount'),
                    maskedPan: maskedPan
                });
                submitModel.set("description", "Ricarica Hype da carta di credito");
                submitModel.set('channel', 'HYPE');
                var resumeView = new View.Resume({
                    model: resumeModel
                });
                profileView.addBlur();
                resumeView.on('close', function() {
                    profileView.removeBlur();
                });
                //resumeView verrà chiusa dopo il success o error, quando si chiude l'overlay
                resumeView.on('confirm', function() {
                    if (profileView.newCard) {
                        that.threeDSAuthorization(submitModel, profileView, true); //true = ricarica, false = aggiunta o modifica
                    } else {
                        //ricarica tramite servizio normale con carta già esistente
                        that.onCardRechargeConfirm(submitModel, resumeView, profileView);
                    }
                });
                Appersonam.CardApp.trigger('show:overlay', resumeView, '-resume');
            },

            threeDSAuthorization: function(cardEntity, profileView, recharging) {
                cardEntity.set({
                    channel: 'HYPE'
                });
                cardEntity.set({
                    email: Appersonam.CommonVariables.myself.email
                });
                var confirm3DSCallback = function() {
                    profileView.removeBlur();
                    urlToEncrypt = '';
                    var cardParams = cardEntity.toJSON();

                    if (!!recharging) {
                        delete cardParams.cardAlias;
                        delete cardParams.circuitName;
                    }
                    for (var key in cardParams) {
                        if (cardParams.hasOwnProperty(key) && cardParams[key]) {
                            urlToEncrypt += key + '=' + cardParams[key] + '~';
                        }
                    }
                    urlToEncrypt = urlToEncrypt.slice(0, -1); //rimuovo ultima tilde
                    var fetchingEncryptedUrl = Appersonam.request('encrypt:url', urlToEncrypt);
                    $.when(fetchingEncryptedUrl).done(function(encryptedUrl) {
                        Appersonam.CommonVariables['ThreeDSCard'] = {
                            recharging: cardParams.hasOwnProperty('amount'),
                            cardData: cardEntity.toJSON()
                        };
                        Appersonam.CommonVariables['loggingOut'] = true; //impedisce all'app di fare logout mentre è aperta la pagina 3dsecure
                        var baseUrl = '';
                        if (cardParams.hasOwnProperty('amount')) {
                            baseUrl = Appersonam.CommonVariables.myself.rechargeCardUrl;
                        } else {
                            baseUrl = Appersonam.CommonVariables.myself.addCardUrl;
                        }
                        WebViewPlugin.openLink(null, null, JSON.stringify({
                            link: baseUrl + '?a=' + encodeURIComponent(encryptedUrl.get('encrypted'))
                        }));
                    });
                };
                var cancel3DSCallback = function() {
                    profileView.removeBlur();
                    Appersonam.CardApp.trigger('close:overlay', '-resume');
                };
                //show3DSAlert = funzione per informare l'utente del 3dsecure
                profileView.addBlur();
                this.show3DSAlert(confirm3DSCallback, cancel3DSCallback, null);
            },
            addCardErrorMap: {
                '0007': 'Autorizzazione 3D richiesta',
                '0008': 'La carta non ha i <strong>requisiti 3DSecure</strong> per essere collegata all&#39;Applicazione<br /><br />Prova con un&#39altra carta',
                '0009': 'Questa carta &egrave; gi&agrave; salvata da <strong>un altro utente in HYPE</strong>, non pu&ograve; quindi essere salvata per le tue ricariche in futuro',
                '0010': 'Limite massimo della carta superato'
            }
        };
    });
    return Appersonam.CardApp.RechargeProfile.Controller;
});