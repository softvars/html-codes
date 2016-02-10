define(["app"], function (Appersonam) {
    Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {
        Entities.Operator = Backbone.Model.extend({
            urlRoot: "INFO/CHARGINGMANAGERS.SPR",
        });

        Entities.OperatorsAndCuts = Backbone.Model.extend({
            urlRoot: 'rest/business/chargingcuts'
        });

        Entities.OperatorsCollection = Backbone.Collection.extend({
            url: "INFO/CHARGINGMANAGERS.SPR",
            model: Entities.Operator,
        });

        Entities.OperatorCut = Backbone.Model.extend({
            urlRoot: "INFO/CHARGINGCUTS.SPR",
        });

        Entities.OperatorCuts = Backbone.Collection.extend({
            url: "INFO/CHARGINGCUTS.SPR",
            model: Entities.Operator,
        });

        Entities.Recharge = Backbone.Model.extend({
            urlRoot: "/DISPO/CHARGEEXEC.SPR",
            defaults: {
            },
            save: function (attributes, options) {
                options.data = _.extend({ aliasib: 'EM1', platform: 'HYPEAPP', deviceid: 'blablalbla' }, this.toJSON());
                options.serviceDestination = 'NEW';
                options.noData = true;
                options.withoutMethods = true;
                Backbone.Model.prototype.save.call(this, attributes, options);
            },
            validate: function () {
                var errors = {};
                if (!this.attributes.numcell || !(this.attributes.numcell.length === 10)) {
                    errors.numcell = "Inserire un numero di telefono valido";
                }
                else {
                    if (parseFloat(this.attributes.amount) > Appersonam.CommonVariables['balance']) {
                        errors['balance'] = 'Il tuo saldo non è sufficiente per effettuare la ricarica';
                    }
                }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });

        var API = {
            getOperatorsAndCuts: function () {
                var operatorsAndCuts = new Entities.OperatorsAndCuts();
                var defer = $.Deferred();
                var promise = defer.promise();
                operatorsAndCuts.fetch({
                    data: {},
                    serviceDestination: 'NEW',
                    success: function (result) {
                        defer.resolve(result);
                    },
                    error: function (result) {
                        defer.resolve(new Backbone.Model());
                    },
                });
                return promise;
            },
            getOperators: function () {
                var operators = new Entities.Operator();
                var defer = $.Deferred();
                operators.fetch({
                    data: {},
                    serviceDestination: 'NEW',
                    success: function (result) {
                        var list = result.get('ManagerList');
                        defer.resolve(list);
                    },
                    error: function (result) {
                        defer.resolve(new Backbone.Collection());
                    },
                });
                var promise = defer.promise();
                return promise;
            },
            getOperatorCut: function (operator) {
                var operators = new Entities.OperatorCuts();
                var defer = $.Deferred();
                operators.fetch({
                    serviceDestination: 'NEW',
                    data: { aliasib: 'EM1', manager: operator },
                    success: function (result) {
                        var list = result.models[0].get('CutList');
                        defer.resolve(list);
                    },
                    error: function (data) {
                        defer.resolve(new Array());
                    }
                });
                var promise = defer.promise();
                return promise;
            },
        };

        Appersonam.reqres.setHandler('operators:cuts', function () {
            return API.getOperatorsAndCuts();
        });

        Appersonam.reqres.setHandler("operator:entities", function () {
            return API.getOperators();
        });

        Appersonam.reqres.setHandler("cut:entities", function (operator) {
            return API.getOperatorCut(operator);
        });

        Appersonam.reqres.setHandler("recharge:entity", function () {
            return new Entities.Recharge();
        });

        //ContactManager.reqres.setHandler("contact:entity:new", function () {
        //    return new Entities.Contact();
        //});
    });
    return;

});
