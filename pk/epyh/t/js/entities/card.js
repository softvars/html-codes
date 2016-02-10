define(["app"], function(Appersonam) {
    Appersonam.module("Entities", function(Entities, Appersonam, Backbone, Marionette, $, _) {
        Entities.BaseCardEntity = Backbone.Model.extend({
            url: 'rest/business/card/',
            validate: function(attrs, options) {
                var errors = {};
                if (!!attrs.id) { //RICARICA O MODIFICA CARTA ESISTENTE
                    if (!!options && !!options.recharging) { //RICARICA CON CARTA ESISTENTE
                        if (!(parseFloat(attrs.amount) > 0)) {
                            errors.amount = 'Inserire un importo';
                        } else if ((parseFloat(attrs.amount) > 250)) {
                            //errors.amount = 'Puoi ricaricare al massimo fino a 250€';
                        }
                    } else { //MODIFICA CARTA ESISTENTE
                        if (isNaN(attrs.cvv) || ('' + attrs.cvv).length !== 3) {
                            errors.cvv = 'Inserire un cvv valido';
                        }
                    }
                } else { //RICARICA O CREA NUOVA CARTA
                    if (!!options && !!options.recharging) { //RICARICA CON CARTA NUOVA
                        if (!(parseFloat(attrs.amount) > 0)) {
                            errors.amount = 'Inserire un importo';
                        } else if ((parseFloat(attrs.amount) > 250)) {
                            //errors.amount = 'Puoi ricaricare al massimo fino a 250€';
                        }
                    }
                    //RICARICA E/O CREAZIONE NUOVA CARTA
                    if (('' + attrs.cardAlias).length < 1) {
                        errors.cardAlias = 'Inserire un nome per questa carta';
                    }
                    if (('' + attrs.cardHolderName).length < 1) {
                        errors.cardHolderName = 'Inserire nome';
                    }
                    if (('' + attrs.cardHolderSurName).length < 1) {
                        errors.cardHolderSurName = 'Inserire cognome';
                    }
                    if (isNaN(attrs.cvv) || ('' + attrs.cvv).length !== 3) {
                        errors.cvv = 'Inserire un cvv valido';
                    }
                    if ((('' + attrs.cardNumber).length < 16) /* || (!isVisa && !isMasterCard)*/ ) {
                        errors.cardNumber = 'Inserire un numero di carta valido';
                    }
                }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });
        Entities.EncryptEntity = Backbone.Model.extend({
            url: 'rest/business/encrypt/'
        });
        Entities.CardEntity = Entities.BaseCardEntity.extend({
            //url: 'rest/business/card',
            validate: function(attrs, options) {
                var errors = {};
                if (!!attrs.id) { //edit

                } else {

                }
                if (isNaN(attrs.cvv) || ('' + attrs.cvv).length !== 3) {
                    errors.cvv = 'Inserire un cvv valido';
                }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });
        Entities.CardsListEntities = Backbone.Collection.extend({
            model: Entities.BaseCardEntity
        });
        Entities.GetCardsListEntity = Entities.BaseCardEntity.extend({
            url: 'rest/business/card/list'
        });
        Entities.SetCardOperativity = Entities.BaseCardEntity.extend({
            url: 'rest/business/card/changeoperativity'
        });
        Entities.RequestCardEntity = Entities.BaseCardEntity.extend({
            url: 'rest/business/card/request/'
        });
        Entities.RechargeCardEntity = Entities.BaseCardEntity.extend({
            url: 'rest/business/card/recharge'
        });
        Entities.ActivateCardEntity = Backbone.Model.extend({
            url: 'rest/business/card/activate'
        });
        var API = {
            GetCardsList: function(list) {
                var entity = new Entities.GetCardsListEntity();
                var defer = $.Deferred();
                if (!!list) {
                    defer.resolve(list);
                } 
                else {
                    entity.fetch({
                        success: function(resultData) {
                            defer.resolve(new Entities.CardsListEntities(resultData.get('cardlist')));
                        },
                        error: function(resultData) {
                            //TEST  
                            setTimeout(function() {
                                defer.resolve(new Entities.CardsListEntities([]));
                            }, 300);
                        }
                    });
                }
                return defer.promise();
            },
            getCardEntity: function() { //PER IL MOSTRA CARTA
                var entity = new Entities.BaseCardEntity();
                var defer = $.Deferred();
                entity.fetch({
                    data: {},
                    success: function(resultData) {
                        if (resultData.get('requestDate')) {
                            resultData.set({
                                physical: true
                            });
                        } else {
                            resultData.set({
                                physical: false
                            });
                        }
                        defer.resolve(resultData);
                    },
                    error: function(resultData) {
                        defer.resolve(new Backbone.Model());
                    }
                });
                return defer.promise();
            },
            encrypt: function(stringToEncode) {
                var entity = new Entities.EncryptEntity();
                var defer = $.Deferred();
                entity.fetch({
                    data: {
                        stringToEncode: stringToEncode
                    },
                    success: function(resultString) {
                        defer.resolve(resultString);
                    },
                    error: function(resultData) {
                        defer.resolve(new Backbone.Model({
                            encrypted: ''
                        }));
                    }
                });
                return defer.promise();
            }
        };

        //chiamate al server
        Appersonam.reqres.setHandler("encrypt:url", function(data) {
            return new API.encrypt(data);
        });
        Appersonam.reqres.setHandler("card:entity", function() {
            return API.getCardEntity(); //PER IL MOSTRA CARTA
        });
        Appersonam.reqres.setHandler("cards:list", function(list) {
            return API.GetCardsList(list);
        });

        //entità
        Appersonam.reqres.setHandler("card:edit", function(data) {
            return new Entities.EditCardEntity(data);
        });
        Appersonam.reqres.setHandler("card:request", function() {
            return new Entities.RequestCardEntity();
        });
        Appersonam.reqres.setHandler("card:activate", function() {
            return new Entities.ActivateCardEntity();
        });
        Appersonam.reqres.setHandler("card:operativity:entity", function(data) {
            return new Entities.SetCardOperativity(data);
        });
        Appersonam.reqres.setHandler('card:new', function(data) {
            return new Entities.BaseCardEntity(data);
        });
        Appersonam.reqres.setHandler('card:recharge:entity', function(data) {
            return new Entities.RechargeCardEntity(data);
        });

    });
    return;
});
