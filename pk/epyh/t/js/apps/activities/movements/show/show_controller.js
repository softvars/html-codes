define(["app",
    "apps/activities/movements/show/show_view",
    "common/dropdown/list/list_view",
    "common/image/profile/profile_view",
    "common/image/show/show_view",
    "common/confirm/profile_view",
    "common/map/show_view",
    "common/authorize/profile_view"
], function(Appersonam, View, DropDown, ImageProfile, ImageShow, Confirm, Map, Authorize) {
    Appersonam.module("MovementsApp.Show", function(Show, Appersonam, Backbone, Marionette, $, _) {
        Show.Controller = {


            showEntity: function(object, mode) { //la navigazione tramite browser per ora non funziona perché manda dei numeri (id) e non delle entità
                var self = this;

                require(["entities/movement", "entities/file", "entities/user", "entities/p2p", "entities/category", 'entities/authorization'], function() {
                    var fetchingCategories = Appersonam.request("category:entities");
                    $.when(fetchingCategories).done(function(categories) {
                        self.doneFetching(object, categories, mode);
                    });
                });
            },
            p2p: function(imageData, transferData, mode) {
                var isEmail = /^[\-\.\w]+@([\-a-zA-Z_0-9]+?\.)*[\-a-zA-Z_0-9]+?\.[a-zA-Z]{2,3}$/.test(transferData.reference);
                var phoneNumber = new Array();
                var email = new Array();
                if (isEmail) {
                    email.push(transferData.reference);
                } else {
                    phoneNumber.push(transferData.reference);
                }
                var imageValue = '',
                    imageId = '';
                if (imageData && imageData.content) {
                    imageValue = imageData.content;
                    imageId = imageData.id;
                }
                var peersCollection = new Backbone.Collection();
                var peerModel = new Backbone.Model({
                    id: '',
                    phoneNumber: phoneNumber,
                    email: email,
                    firstName: transferData.mateFirstName,
                    lastName: transferData.mateLastName,
                    hyper: true,
                    imageId: imageId,
                    imageValue: imageValue,
                    serviceDestination: '',
                    iban: '',
                    type: '',
                    destination: transferData.reference
                });
                peersCollection.add(peerModel);
                var transferModel = new Backbone.Model({
                    peersCollection: peersCollection,
                    amount: 0,
                    'description': "",
                    transferDate: new moment(new Date()).format('YYYY-MM-DD')
                });
                Appersonam.ActivitiesApp.trigger('p2p:reply', transferModel, mode);
            },
            doneFetching: function(originalObject, categories, mode) {
                var self = this;
                var entity = originalObject.clone();
                var imageShowView = new ImageShow.ImageWidget({
                    model: new Backbone.Model({
                        loading: true,
                        target: '#top-image'
                    })
                });
                var self = this;
                var editable = true;
                var deviceVariables = Appersonam.request('global:get:device');
                var entitySubtype = entity.get('subType');
                if (entitySubtype === 'p2p') {
                    var p2pType = entity.get('p2pType');
                    switch (p2pType) {

                        case 'request_out':
                            self.entityView = new View.OutgoingRequest({
                                model: entity
                            });
                            break;
                        case 'reject_in':
                            self.entityView = new View.RejectedRequestIn({
                                model: entity
                            });
                            break;
                        case 'reject_out':
                            self.entityView = new View.RejectedRequestOut({
                                model: entity
                            });
                            break;
                        case 'request_in':
                            self.entityView = new View.IncomingRequest({
                                model: entity
                            });
                            break;
                        case 'receive_pending':
                            self.entityView = new View.PendingIncomingPayment({
                                model: entity
                            });
                            break;
                        case 'send_pending':
                            self.entityView = new View.PendingOutgoingPayment({
                                model: entity
                            });
                            break;
                            //p2p contabilizzato
                        default:
                            editable = true;
                            self.entityView = new View.ClosedP2p({
                                model: entity,
                                editable: editable
                            });
                    }
                } else {
                    switch (entitySubtype) {
                        case 'bonifico':
                            editable = false;
                            self.entityView = new View.Transfer({
                                model: entity,
                                editable: editable
                            });
                            break;
                        case 'bon':
                            self.entityView = new View.Transfer({
                                model: entity,
                                editable: editable
                            });
                            break;
                        case 'pap':
                            self.entityView = new View.Pap({
                                model: entity,
                                editable: editable
                            });
                            break;
                        case 'atm':
                            self.entityView = new View.Atm({
                                model: entity,
                                editable: editable
                            });
                            break;
                        case 'gas':
                            self.entityView = new View.Gas({
                                model: entity,
                                editable: editable
                            });
                            break;
                        case 'crd':
                            if (entity.get('type') === 'income') {
                                self.entityView = new View.CardRecharge({
                                    model: entity,
                                    editable: false
                                });
                            } else {
                                self.entityView = new View.Card({
                                    model: entity,
                                    editable: true
                                });
                            }
                            break;
                        case 'ric':
                            self.entityView = new View.Recharge({
                                model: entity,
                                editable: true
                            });
                            break;
                        default:
                            self.entityView = new View.NormalEntity({
                                model: entity,
                                editable: editable
                            });
                    }
                }


                self.entityView.on("movements:edit", function(entity) {
                    Appersonam.ActivitiesApp.trigger("movements:edit", entity.get("id"));
                });

                entity.on('change', function() { //se è cambiato il merchant o il goal, aggiorno l'oggetto originale, quello collegato alla itemview
                    var newGoal = entity.get('goal');
                    var newMerchant = entity.get('merchant');
                    originalObject.set({
                        goal: newGoal,
                        merchant: newMerchant
                    });
                    self.updateCachedMovements(originalObject.toJSON());
                });
                self.entityView.on("movements:spend-from-goal", function() {
                    /*entity.on('change', function () {
                        entity.on('change', null);
                        originalObject.set({ goal: entity.get('goal') });
                        self.updateCachedMovements(originalObject.toJSON());
                    })*/
                    Appersonam.ActivitiesApp.trigger("movements:spend-from-goal", entity);
                });
                self.entityView.on("movements:set-venue", function() {
                    /*entity.on('change', function () {
                        entity.on('change', null);
                        originalObject.set({ merchant: entity.get('merchant') });
                        self.updateCachedMovements(originalObject.toJSON());
                    })*/
                    Appersonam.ActivitiesApp.trigger("movements:set-venue", entity);
                });
                self.entityView.on("hashtag:search", function(value) {
                    Appersonam.ActivitiesApp.trigger("activities:search", value);
                });
                var fetchingEntity = Appersonam.request('movement:entity:new', entity.toJSON(), false); //showloading  false
                fetchingEntity.id = self.entityView.cid;
                $.when(fetchingEntity).done(function(updatedEntity) {
                    //setTimeout(function () { 
                    if (fetchingEntity.id === self.entityView.cid) {
                        if (updatedEntity.get('subType') === 'p2p') {
                            var fetchingImage = Appersonam.request("get:image:base64", updatedEntity.get('image'), '#top-image');
                        } else {
                            var imageId = originalObject.get('image');
                            var fetchingImage = Appersonam.request("get:image", imageId, '#top-image', false); //showloading  false
                        }
                        $.when(fetchingImage).done(function(image) {
                            if (self.entityView && self.entityView.isClosed !== true && image.get('content')) {
                                //OBJECT: modello che viene dalla lista di movimenti
                                //entity: modello per la shoView, arricchito di altri dati come la foto etc. 
                                imageShowView.model.clear({
                                    silent: true
                                });
                                imageShowView.model.set(image.toJSON(), {
                                    silent: true
                                });
                                self.entityView.hideInitials(); //rieffettuare il render della view causa il malfunzionamento del dropdown, quindi devo solo nascondere le iniziali nel baloon
                                //self.entityView.dropdwonRegion.show(dropdown);
                                self.entityView.imageShowRegion.show(imageShowView);
                            }
                        });
                    }
                    //}, 5000)
                });



                self.entityView.on("cancel:intent", function(paymentReferenceNumber) {

                    var confirmModel = new Backbone.Model({
                        title: "Vuoi eliminare questo pagamento?",
                        description: "",
                        button: 'Conferma',
                        header: 'ANNULLA INVIO',
                        className: 'confirmation-dialog-danger',
                    });
                    var p2pCancelPayment = Appersonam.request('p2p:cancel:pending', paymentReferenceNumber);

                    var confirmPanel = new Confirm.Profile({
                        model: confirmModel
                    });
                    Appersonam.ActivitiesApp.trigger('show:overlay', confirmPanel, '-1');
                    self.entityView.addBlur();
                    confirmPanel.on('cancel', function() {
                        self.entityView.removeBlur();
                        Appersonam.ActivitiesApp.trigger('close:overlay', '-1');
                    });
                    confirmPanel.on('confirm', function() {
                        var data = {
                            amount: 0
                        };
                        p2pCancelPayment.save(null, {
                            data: data,
                            success: function(requestResult) {
                                Appersonam.request('tracking:log:event', 'p2p_cancel_payment');
                                var errorMessage = requestResult.get('ErrorMessage');
                                if (errorMessage) {
                                    var errorCode = errorMessage[0].errorCode;
                                    p2pCancelPayment.unset('ErrorMessage');
                                    self.authorize(errorCode, p2pCancelPayment, amount);
                                    setTimeout(function() {
                                        Appersonam.ActivitiesApp.trigger('close:overlay', '-1');
                                    }, 200);
                                } else {
                                    var status = requestResult.get('status');
                                    if (status.code === 'OK') {
                                        Appersonam.ActivitiesApp.trigger('close:overlay', '-1');
                                        self.showResult(true, 'Il pagamento è stato annullato');

                                    } else {
                                        Appersonam.ActivitiesApp.trigger('close:overlay', '-1');
                                        self.showResult(false, status.description);
                                    }

                                }
                            },
                            error: function(requestResult) {
                                Appersonam.ActivitiesApp.trigger('close:overlay', '-1');
                                self.showResult(false, 'Si è verificato un errore');
                            }
                        })
                    });
                });


                self.entityView.on("cancel:transfer", function() {
                    var confirmModel = new Backbone.Model({
                        title: "Stai per annullare questo bonifico",
                        description: "Il bonifico verrà annullato e non apparirà più nella tua lista.",
                        button: 'Conferma annullamento',
                        className: 'confirmation-dialog-danger',
                    });
                    var confirmPanel = new Confirm.Profile({
                        model: confirmModel
                    });
                    Appersonam.ActivitiesApp.trigger('show:overlay', confirmPanel, '-1');
                    self.entityView.addBlur();
                    confirmPanel.on('cancel', function() {
                        self.entityView.removeBlur();
                        Appersonam.ActivitiesApp.trigger('close:overlay', '-1');
                    });
                    confirmPanel.on('confirm', function() {
                        var cancelTransferModel = Appersonam.request('cancel:transfer', entity.get('bonificoid'), Appersonam.CommonVariables.aliasIb);
                        cancelTransferModel.save({
                            idBonifico: entity.get('id')
                        }, {
                            success: function(deleteResult) {
                                Appersonam.request('tracking:log:event', 'cancel_money_transfer');
                                var errorMessage = deleteResult.get('ErrorMessage');
                                if (errorMessage) {
                                    cancelTransferModel.unset('ErrorMessage');
                                    Appersonam.ActivitiesApp.trigger('close:overlay', '-1');
                                    self.showResult(false, 'Si è verificato un errore');
                                } else {
                                    Appersonam.ActivitiesApp.trigger('close:overlay', '-1');
                                    self.showResult(true, 'Transazione eseguita con successo');
                                }
                            },
                            error: function() {
                                Appersonam.ActivitiesApp.trigger('close:overlay', '-1');
                                self.showResult(false, 'Si è verificato un errore');
                            }
                        })
                    });
                });
                if (editable === true) {
                    var dropdown = new DropDown.DropdownItemsView({
                        collection: categories,
                        selectedItem: entity.get('category')
                    });
                    dropdown.on("item:selected", function(data) {
                        self.entityView.setProperty('category', data.toJSON());
                    });
                }
                self.entityView.on('reply', function(mode) {
                    self.p2p(imageShowView.model.toJSON(), this.model.toJSON(), mode);
                });
                var imageId = entity.get('image');
                var imageProfile = Appersonam.request("file:entity", imageId);


                self.entityView.on('back', function(newData) {
                    var oldData = originalObject.toJSON();
                    if (!oldData.memo) {
                        oldData.memo = '';
                    }
                    if (newData && !newData.memo) {
                        newData.memo = '';
                    }
                    if ((newData === null || JSON.stringify(oldData.memo) === JSON.stringify(newData.memo) && JSON.stringify(oldData.category) == JSON.stringify(newData.category))) {
                        //console.log('il memo o la categoria NON SONO cambiati');
                        Appersonam.ActivitiesApp.trigger("nav:back", 'activities/movements', 1);
                    } else {
                        originalObject.set({
                            category: newData.category,
                            memo: newData.memo
                        });
                        entity.set(originalObject.toJSON(), {
                            silent: true
                        });
                        self.updateCachedMovements(newData);
                        Appersonam.ActivitiesApp.trigger("nav:back", 'activities/movements', 1);

                        entity.save(null, {
                            //devo fare il save su entity, perché sulla risposta del server alcuni dati vengono persi (matefirstname per esempio)
                            //questo comporterebbe che l'oggetto della lista movimenti verrebbe modificato dalla funzione save;
                            //pertanto uso come appoggio entity, per aggiornare i dati sul server, senza modificare ulteriormente l'oggetto originale
                            showLoading: false,
                            serviceDestination: 'NEW',
                            success: function(data) {
                                Appersonam.request('tracking:log:event', 'movement_data_edited');
                                //if (!data.get('ErrorMessage')) {
                                console.log('dati aggiornati :');
                                console.log(newData);
                                //} //al momento anche se ricevo messaggio di errore il memo viene salvato, quindi lo ignoro
                                //else {
                                //    originalObject.clear({ silent: true });
                                //    originalObject.set(oldData, { silent: false });
                                //}
                            },
                            error: function(data) {
                                originalObject.clear({
                                    silent: true
                                });
                                originalObject.set(oldData, {
                                    silent: false
                                });
                            },
                            silent: true
                        });
                    }
                });
                /* {
                    Appersonam.ActivitiesApp.trigger("nav:back", 'activities/movements', 1);
                });*/


                self.entityView.on("p2p:request", function(grant, mateFirstName, mateLastName, paymentReferenceNumber, amount, message) {
                    mateFirstName = mateFirstName.toLowerCase();
                    if (grant === true) {
                        var confirmModel = new Backbone.Model({
                            title: 'Vuoi accettare la richiesta di <div class="capitalize" >' + mateFirstName + '</div>?',
                            description: "",
                            button: 'Conferma',
                            className: 'confirmation-dialog-safe',
                            header: 'RICHIESTA DENARO'
                        });
                        var p2pRequest = Appersonam.request('p2p:grant', paymentReferenceNumber, mateFirstName, mateLastName, Appersonam.CommonVariables.idConto);
                    } else {
                        var confirmModel = new Backbone.Model({
                            title: 'Vuoi negare la richiesta di <div class="capitalize" >' + mateFirstName + '</div>?',
                            description: "",
                            button: 'Conferma',
                            className: 'confirmation-dialog-safe',
                            header: 'RICHIESTA DENARO'
                        });
                        var p2pRequest = Appersonam.request('p2p:deny', paymentReferenceNumber, message);
                    }
                    var confirmPanel = new Confirm.Profile({
                        model: confirmModel
                    });
                    confirmPanel.lockButton = false;
                    Appersonam.ActivitiesApp.trigger('show:overlay', confirmPanel, '-1');
                    self.entityView.addBlur();
                    confirmPanel.on('cancel', function() {
                        self.entityView.removeBlur();
                        Appersonam.ActivitiesApp.trigger('close:overlay', '-1');
                    });
                    confirmPanel.on('close', function() {
                        confirmPanel.lockButton = false;
                    });
                    confirmPanel.on('confirm', function() {
                        if (confirmPanel.lockButton !== true) {
                            confirmPanel.lockButton = true;
                            var data = {
                                amount: amount
                            };
                            p2pRequest.save(null, {
                                data: data,
                                success: function(requestResult) {
                                    var errorMessage = requestResult.get('ErrorMessage');
                                    if (errorMessage) {
                                        var errorCode = errorMessage[0].errorCode;
                                        p2pRequest.unset('ErrorMessage');
                                        self.authorize(errorCode, p2pRequest, amount);
                                        setTimeout(function() {
                                            Appersonam.ActivitiesApp.trigger('close:overlay', '-1');
                                        }, 200);
                                    } else {
                                        var status = requestResult.get('status');
                                        if (status.code === 'OK') {
                                            Appersonam.ActivitiesApp.trigger('close:overlay', '-1');
                                            if (grant === true) {
                                                Appersonam.request('tracking:log:event', 'p2p_request_ok');
                                            } else {
                                                Appersonam.request('tracking:log:event', 'p2p_request_rejected');
                                            }
                                            self.showResult(true, 'Transazione eseguita con successo');

                                        } else {
                                            Appersonam.ActivitiesApp.trigger('close:overlay', '-1');
                                            self.showResult(false, status.description);
                                        }
                                    }
                                    confirmPanel.lockButton = false;
                                },
                                error: function(requestResult) {
                                    Appersonam.ActivitiesApp.trigger('close:overlay', '-1');
                                    self.showResult(false, 'Si è verificato un errore');
                                    confirmPanel.lockButton = false;
                                }
                            })
                        }
                    });
                    confirmPanel.on('cancel', function() {
                        self.entityView.removeBlur();
                        Appersonam.ActivitiesApp.trigger('close:overlay', '-1');
                        confirmPanel.lockButton = false;
                    });
                });

                self.entityView.on('render', function() {
                    var merchant = entity.get('merchant');
                    var mapView = null;
                    if (merchant && merchant.latitude && merchant.longitude) {
                        var mapView = new Map.ShowView({
                            model: new Backbone.Model(merchant)
                        });
                    }
                    self.entityView.imageProfileRegion.close();
                    if (editable === true) {
                        self.entityView.dropdwonRegion.show(dropdown);
                    }
                    if (mapView) {
                        self.entityView.mapRegion.show(mapView);
                    }
                    var imageProfileView = new ImageProfile.ImageWidget({
                        model: imageProfile,
                        platform: deviceVariables.platform
                    });
                    imageProfileView.on('image:selected', function(data, model) {
                        model.save({
                            content: data
                        }, {
                            serviceDestination: 'NEW',
                            success: function(result) {//image saved
                                imageShowView.model.set('content', data, {
                                    silent: false
                                });
                                setImageEntity(result, entity);
                                self.entityView.imageUploaded();
                            }
                        }, {
                            error: function(data) {}
                        });
                    });
                    if (self.entityView.options.editable === true) {
                        //self.entityView.imageShowRegion.show(imageShowView);
                        self.entityView.imageProfileRegion.show(imageProfileView);
                        self.entityView.imageShowRegion.show(imageShowView);
                    }
                });
                self.entityView.on('show', function() {
                    self.entityView.imageShowRegion.show(imageShowView);
                });

                if (mode === 'refresh') {
                    Appersonam.ActivitiesApp.trigger('movements:list', 'refresh', 0); //passando 0, non si scatenerà il trigger nav:back
                    Appersonam.ActivitiesApp.trigger('refresh:panel', self.entityView, 2);
                } else if (mode === 'refresh_back') {
                    Appersonam.ActivitiesApp.trigger('movements:list', 'refresh', 0); //passando 0, non si scatenerà il trigger nav:back
                    Appersonam.ActivitiesApp.trigger("nav:back", 'activities/movements' + entity.get('id'), 1);

                } else {
                    Appersonam.ActivitiesApp.trigger('show:main', self.entityView, 2);
                }
                var setImageEntity = function(image, entity) {
                    originalObject.set({
                        image: image.get('id')
                    });
                    entity.save({
                        image: image.get('id')
                    }, {
                        serviceDestination: 'NEW',
                        success: function(data) {
                            Appersonam.ActivitiesApp.trigger('movements:list', 'refresh', 0); //passando 0, non si scatenerà il trigger nav:back
                            imageShowView.render();
                        }
                    }, {
                        error: function(data) {}
                    });
                };
            },

            authorize: function(errorCode, transferModel, amount) {
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
                        self.showResult(false, self.errorCodesMap['000']);
                        return false;
                        break;
                }
                var pinView = new Authorize.Pin({
                    model: authorizationModel
                });
                pinView.on('close', function() {
                    pinView.triggerMethod('set:lock:button', false);
                    self.entityView.removeBlur();
                    Appersonam.ActivitiesApp.trigger('close:overlay', '-pin');
                });
                pinView.on('form:submit', function(data) {
                    data.amount = amount;
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
                                    self.showResult(false, self.errorCodesMap[authError]);
                                    Appersonam.ActivitiesApp.trigger('close:overlay', '-pin');
                                } else {
                                    //errore generico
                                    self.showResult(false, self.errorCodesMap['000']);
                                    self.entityView.removeBlur();
                                    Appersonam.ActivitiesApp.trigger('close:overlay', '-pin');
                                }
                            } else {
                                //risposta da p2p
                                var status = result.get('status');
                                if (status.code === 'OK') {
                                    self.showResult(true, 'Transazione eseguita con successo');
                                    Appersonam.ActivitiesApp.trigger('close:overlay', '-pin');
                                    Appersonam.request('tracking:log:event', 'p2p_request_ok');

                                } else {
                                    self.showResult(false, status.description);
                                    Appersonam.ActivitiesApp.trigger('close:overlay', '-pin');
                                }
                            }
                            pinView.close();
                        },
                        error: function(data) {
                            pinView.close();
                            self.entityView.removeBlur();
                            Appersonam.ActivitiesApp.trigger('close:overlay', '-pin');
                        }
                    });
                });
                self.entityView.addBlur();
                Appersonam.ActivitiesApp.trigger('show:overlay', pinView, '-pin');
            },

            updateCachedMovements: function(newData) {
                var fetchingCachedMovements = Appersonam.request("global:get:object", 'movements');
                $.when(fetchingCachedMovements).done(function(cachedMovements) { //aggiorno i movimenti cachati
                    cachedCollection = new Backbone.Collection(cachedMovements);
                    var cachedModel = cachedCollection.get(newData.id);
                    if (cachedModel) {
                        cachedModel.set(newData);
                        Appersonam.request("global:initialize:object", cachedCollection.toJSON(), 'movements');
                    }
                });
            },

            showResult: function(success, message) {
                var self = this;
                if (success === true) {
                    var confirmModel = new Backbone.Model({
                        title: 'Operazione completata con successo',
                        description: "",
                        button: 'Torna alla lista',
                        className: 'information-dialog',
                        closeButton: 'none'
                    });
                } else {
                    var confirmModel = new Backbone.Model({
                        title: 'Si è verificato un errore',
                        description: message,
                        className: 'confirmation-dialog-danger',
                    });
                }
                confirmPanel = new Confirm.Profile({
                    model: confirmModel
                });
                confirmPanel.on("cancel", function() {
                    self.entityView.removeBlur();
                    Appersonam.ActivitiesApp.trigger('close:overlay', '-result');
                });

                var returnToMovements = function() {
                    Appersonam.ActivitiesApp.trigger('movements:list', 'refresh', 0); //passando 0, non si scatenerà il trigger nav:back
                    Appersonam.ActivitiesApp.trigger('close:overlay', '-result');
                    Appersonam.ActivitiesApp.trigger('update:sts');
                    self.entityView.removeBlur();
                    Appersonam.trigger('back:button:clicked');
                };

                confirmPanel.on("confirm", function() {
                    confirmPanel.close();
                });

                if (success === true) {
                    confirmPanel.on('close', function() {
                        returnToMovements();
                    });
                }

                Appersonam.ActivitiesApp.trigger('show:overlay', confirmPanel, '-result');
            },

            errorCodesMap: {
                '693': 'La password inserita non è valida',
                '694': "La password o il codice sms non sono validi",
                '000': 'Si è verificato un errore tecnico. Riprovare più tardi.'
            }

            //showEntityById: function (id) { //la navigazione tramite browser per ora non funziona perché manda dei numeri (id) e non delle entità
            //    var self = this;

            //    require(["entities/movement", "entities/file", "entities/user", "entities/p2p", "entities/category", 'entities/authorization'], function () {
            //        var fetchingMovement = Appersonam.request("movement:entity", id);
            //        //var fetchingUser = Appersonam.request("user:entity");//USER SERVIVA PER PRENDERE ALIASIB E IDCONTO, ORA ACCESSIBILI NELLA VARIABILE APPERSONAM.COMMONVARIABLES
            //        var fetchingCategories = Appersonam.request("category:entities");

            //        $.when(fetchingMovement, fetchingCategories /*, fetchingUser*/).done(function (entity, categories /*, user*/) {
            //            self.doneFetching(entity, categories /*, user.get('aliasIb')*/);
            //        });
            //    });
            //},
        }
    });
    return Appersonam.MovementsApp.Show.Controller;
});
