define(["app",
    "moment",
    "iban"], function (Appersonam, moment) {
        Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {
            moment.lang('it');
            Entities.P2pPayment = Backbone.Model.extend({
                url: "/DISPO/P2P/payment/make",
                defaults: {
                    instrumentType: "IDCONTO",//da login
                    channel: "Internet",
                    contactChannel: "HYPE"
                },
                save: function (attributes, options) {
                    options.serviceDestination = 'NEW';
                    options.withoutMethods = true;
                    //options.data = { amount: this.get('amount') };
                    Backbone.Model.prototype.save.call(this, attributes, options);
                }
            });

            Entities.Peer = Backbone.Model.extend({
                url: "",
                defaults: {

                },
                validate: function (attrs, mode) {
                    var errors = {}
                    if (!attrs.firstName || attrs.firstName.replace(/\s+/g, '') === '') {
                        errors.firstName = "Inserire un nome";
                    }
                    if (!attrs.lastName || attrs.lastName.replace(/\s+/g, '') === '') {
                        errors.lastName = "Inserire un cognome";
                    }
                    if (!attrs.destination || attrs.destination.replace(/\s+/g, '') === '') {
                        errors.destination = "Inserire un recapito";
                    }
                    else {
                        var isIban = IBAN.isValid(attrs.destination.replace(/\s+/g, ''));
                        var isEmail = /^[\-\.\w]+@([\-a-zA-Z_0-9]+?\.)*[\-a-zA-Z_0-9]+?\.[a-zA-Z]{2,3}$/.test(attrs.destination.replace(/\s+/g, ''));
                        var isPhoneNumber = /^([00|\+]+\d{2})?3\d{9}$/.test(attrs.destination.replace(/\s+/g, ''));
                        if ((!isIban || isIban === true && mode === 'request') && !isEmail && !isPhoneNumber) {
                            errors.destination = "Inserire un recapito valido";
                        }
                        if (isIban === true) {
                            if (attrs.transferDate === '') {
                                errors.transferDate = "Selezionare una data";
                            }

                            else {
                                var dateObject = new Date(moment(attrs.transferDate, 'YYYY-MM-DD').format('MM-DD-YYYY'))
                                if (dateObject.getDay() === 0 || dateObject.getDay() === 6) {
                                    errors.transferDate = "Non è possibile selezionare un sabato o domenica";
                                }
                            }
                        }
                    }
                    if (!_.isEmpty(errors)) {
                        return errors;
                    }
                    else {
                        return null;
                    }
                }
            });

            Entities.P2PGrant = Backbone.Model.extend({
                url: "/DISPO/P2P/payment/approve",
                defaults: {
                    instrumentType: "IDCONTO"
                },
                save: function (attributes, options) {
                    options.serviceDestination = 'NEW';
                    options.withoutMethods = true;
                    //options.data = { amount: this.get('amount') };
                    Backbone.Model.prototype.save.call(this, attributes, options);
                }
            });

            Entities.P2PCancelPending = Backbone.Model.extend({
                url: "/DISPO/P2P/payment/cancel",
                defaults: {
                    reason: "Cancelling"
                },
                save: function (attributes, options) {
                    options.serviceDestination = 'NEW';
                    options.withoutMethods = true;
                    //options.data = { amount: this.get('amount') };
                    Backbone.Model.prototype.save.call(this, attributes, options);
                }
            });


            Entities.P2PDeny = Backbone.Model.extend({
                url: "/DISPO/P2P/payment/reject",
                defaults: {
                    reason: "Rejecting"
                },
                save: function (attributes, options) {
                    options.serviceDestination = 'NEW';
                    options.withoutMethods = true;
                    //options.data = { amount: this.get('amount') };
                    Backbone.Model.prototype.save.call(this, attributes, options);
                }
            });

            Entities.ConfirmTransfer = Backbone.Model.extend({
                urlRoot: "/DISPO/SETBONIFICO.SPR",
                save: function (attributes, options) {
                    options.serviceDestination = 'NEW';
                    options.noData = true;
                    options.withoutMethods = true;
                    Backbone.Model.prototype.save.call(this, attributes, options);
                }
            });
            Entities.TransferDates = Backbone.Model.extend({
                initialize: function (dates) {
                    var millisecondsStart = new Date(moment(dates.DateStart, 'DD-MM-YYYY').format('MM-DD-YYYY')).getTime();
                    var millisecondsEnd = new Date(moment(dates.DateStop, 'DD-MM-YYYY').format('MM-DD-YYYY')).getTime();
                    var defaultDate = moment(dates.DateStart, 'DD-MM-YYYY').format('YYYY-MM-DD');
                    this.set({
                        millisecondsStart: millisecondsStart,
                        millisecondsEnd: millisecondsEnd,
                        defaultDate: defaultDate
                    });
                }
            });
            Entities.ValidateTransfer = Backbone.Model.extend({
                url: "INFO/CHECKBONIFICO.SPR",
                defaults: {
                },
                save: function (attributes, options) {
                    options.data = this.toJSON();
                    options.serviceDestination = 'NEW';
                    options.noData = true;
                    options.withoutMethods = true;
                    Backbone.Model.prototype.save.call(this, attributes, options);
                }
            });
            Entities.GetTransferDates = Backbone.Model.extend({
                url: "INFO/GETBONIFICOINIT.SPR",
                save: function (attributes, options) {
                    options.serviceDestination = 'NEW';
                    options.noData = true;
                    options.withoutMethods = true;
                    options.data = this.toJSON();
                    Backbone.Model.prototype.save.call(this, attributes, options);
                }
            });


            Entities.P2pRequest = Backbone.Model.extend({
                url: "/INFO/P2P/payment/request",
                defaults: {
                    instrumentType: "IDCONTO",//da login
                    channel: "0",
                    contactChannel: "HYPE"
                },
                save: function (attributes, options) {
                    options.serviceDestination = 'NEW';
                    options.withoutMethods = true;
                    Backbone.Model.prototype.save.call(this, attributes, options);
                }
            });

            var API = {
                getTransferDates: function (data, aliasib) {

                    var defer = $.Deferred();
                    var transferDates = new Entities.GetTransferDates({
                        destinationproduct: data.destination.toUpperCase(),
                        deviceid: 'blablalbla',
                    });
                    transferDates.save(null, {
                        success: function (result) {
                            if (result.attributes.DateStart || result.attributes.DateStop) {
                                API.validateTransferData(defer, result.toJSON(), data, aliasib);
                            }
                            else {
                                var transferValidation = {
                                    errors: {
                                        transferDate: "I dati inseriti non sono validi"
                                    }
                                }
                                defer.resolve(transferValidation);
                            }
                        },
                        error: function (result) {
                            defer.resolve(new Backbone.Model());
                        }
                    });
                    var promise = defer.promise();
                    return promise;
                },
                /*validateTransferData: function (data, aliasib) {
                    var defer = $.Deferred();
                    var validateData = new Entities.ValidateTransfer({
                        aliasib: aliasib,
                        platform: 'HYPEAPP',
                        deviceid: 'blablalbla',
                        destinationproduct: data.destination,
                        beneficiario: data.firstName + ' ' + data.lastName,
                        datavalutabeneficiario: data.date,
                        ordinantecausale: data.description,
                        amount: data.amount
                    });
                    validateData.save(null, {
                        success: function (result) {
                            defer.resolve(result.toJSON());
                        },
                        error: function (result) {
                            defer.resolve(new Backbone.Model());
                        }
                    });
                    var promise = defer.promise();
                    return promise;

                },
                */

                validateTransferData: function (defer, dates, data, aliasib) {
                    var millisecondsStart = new Date(moment(dates.DateStart, 'DD-MM-YYYY').format('YYYY-MM-DD')).getTime();
                    var millisecondsEnd = new Date(moment(dates.DateStop, 'DD-MM-YYYY').format('YYYY-MM-DD')).getTime();
                    var millisecondsTransferDate = new Date(data.transferDate).getTime();
                    if (!(millisecondsTransferDate >= millisecondsStart && millisecondsTransferDate <= millisecondsEnd)) {
                        var transferValidation = {
                            errors: {
                                transferDate: "Selezionare una data compresa tra " + dates.DateStart + " e " + dates.DateStop
                            }
                        }
                        defer.resolve(transferValidation);
                    }
                    else {
                        var validateData = new Entities.ValidateTransfer({
                            aliasib: aliasib,
                            platform: 'HYPEAPP',
                            deviceid: 'blablalbla',
                            destinationproduct: data.destination.toUpperCase(),
                            beneficiario: data.firstName + ' ' + data.lastName,
                            datavalutabeneficiario: moment(data.transferDate, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                            ordinantecausale: data.description,
                            amount: data.amount
                        });
                        validateData.save(null, {
                            success: function (result) {
                                if (result.get('ErrorMessage')) {
                                    var transferValidation = {
                                        errors: {
                                            destination: "Destinatario non valido"
                                        }
                                    }
                                    defer.resolve(transferValidation);
                                }
                                else defer.resolve({});
                            },
                            error: function (result) {
                                var transferValidation = {
                                    errors: {
                                        destination: "Destinatario non valido"
                                    }
                                }
                                defer.resolve(transferValidation);
                            }
                        });
                    }
                },


                getPaymentModel: function (data, peerModel, receiverAliasType) {
                    var model = new Entities.P2pPayment();
                    model.set({
                        receiverAlias: peerModel.get('destination'),//email o telefono
                        receiverName: peerModel.get('firstName'),
                        receiverSurname: peerModel.get('lastName'),
                        description: data.description,
                        amount: data.amount,
                        channel: "0",
                        instrumentType: "IDCONTO",
                        contactChannel: "HYPE",
                        instrumentValue: data.instrumentValue,
                        receiverAliasType: receiverAliasType
                    });
                    return model;
                },
                getRequestModel: function (data, destinationsCollaction) {
                    var senderAliasesType = {};
                    senderAliasesType.senderAliasType = new Array();
                    _.each(destinationsCollaction, function (iterator, index, collection) {
                        var model = collection.at(index);
                        if (/^([00|\+]+\d{2})?3\d{9}$/.test(model.get('destination'))) {
                            var aliasType = 'M';
                        }
                        else {
                            var aliasType = 'E';
                        }
                        var aliasValue = model.get('destination');
                        if (aliasType === 'M') {
                            if (aliasValue.indexOf('0039') === 0) {
                                aliasValue = aliasValue.replace('0039', '+39');
                            }
                            else if (aliasValue.indexOf('+39') !== 0) {
                                aliasValue = '+39' + aliasValue;
                            }
                        }
                        var name = model.get('firstName');
                        var surname = model.get('lastName');
                        senderAliasesType.senderAliasType.push({
                            name: name,
                            surname: surname,
                            aliasType: aliasType,
                            aliasValue: aliasValue
                        });
                    });
                    var model = new Entities.P2pRequest();
                    model.set({
                        senderAliasesType: senderAliasesType,//email o telefono
                        description: data.description,
                        amount: data.amount,
                        instrumentValue: data.instrumentValue,
                        channel: "0",
                        instrumentType: "IDCONTO",
                        contactChannel: "HYPE",
                    });
                    return model;
                },

                getTransferPaymentModel: function (data) {//servizi legacy
                    var model = new Entities.MoneyTransferPayment();
                    var aliasType = '';
                    model.set({
                        destinationproduct: data.destination,//iban
                        beneficiario: data.firstName + " " + data.lastName,
                        datavalutabeneficiario: data.date,
                        ordinantecausale: data.description,
                        amount: data.amount.replace('.', ',')
                    });
                    var errors = API.validateTransferData(model.toJSON());
                    return model;
                }
            };
            Appersonam.reqres.setHandler("p2p:payment", function (data, destinationModel) {//servizi p2p
                var errors = {};
                var receiverAliasType = '';

                if (!data.description) {
                    errors.description = "Inserire una causale";
                }
                if (!(parseFloat(data.amount) >= 0.01) || data.amount === '' || data.amount === '' || isNaN(data.amount)) {
                    errors.amount = "Inserire un importo valido ( almeno 1 centesimo )";
                }
                if (!destinationModel) {
                    errors.peer = "Selezionare un peer";
                }
                else {
                    var destination = destinationModel.get('destination');
                    var isIban = IBAN.isValid(destination.replace(/\s+/g, ''));
                    var isMail = /^[\-\.\w]+@([\-a-zA-Z_0-9]+?\.)*[\-a-zA-Z_0-9]+?\.[a-zA-Z]{2,3}$/.test(destination);
                    var isMobile = /^([00|\+]+\d{2})?3\d{9}$/.test(destination);
                    if (isIban === true) {
                        receiverAliasType = 'IBAN';
                    }
                    else if (isMail === true) {
                        receiverAliasType = 'E';
                    }
                        //else if (isMobile === true) {
                    else {
                        receiverAliasType = 'M';
                        if (destination.indexOf('0039') === 0) {
                            destination = destination.replace('0039', '+39');
                        }
                        else if (destination.indexOf('+39') !== 0) {
                            destination = '+39' + destination;
                        }
                        destinationModel.set('destination', destination, { silent: true });
                    }

                    //}
                    //else {
                    //    errors.destination = "Inserire un destinatario valido";
                    //}
                }
                if (!_.isEmpty(errors)) {
                    return { model: null, errors: errors };
                }
                else {
                    if (receiverAliasType === "IBAN") {
                        return { model: null, errors: errors, type: 'transfer' };
                    }
                    else {
                        var model = API.getPaymentModel(data, destinationModel, receiverAliasType);
                        return { model: model, errors: errors };
                    }
                }
            });
            Appersonam.reqres.setHandler("p2p:request", function (data, destinationsCollection) {//servizi p2p
                var errors = {};
                if (!data.description) {
                    errors.description = "Inserire una causale";
                }
                if (!(parseFloat(data.amount) >= 0.01) || data.amount === '' || data.amount === '' || isNaN(data.amount)) {
                    errors.amount = "Inserire un importo valido ( almeno 1 centesimo )";
                }
                if (destinationsCollection.length < 1) {
                    errors.peer = "Selezionare un peer";
                }
                if (!_.isEmpty(errors)) {
                    return { model: null, errors: errors };
                }
                else {
                    var model = API.getRequestModel(data, destinationsCollection);
                    return { model: model, errors: errors };
                }
            });

            //Appersonam.reqres.setHandler("p2p:request", function (data) {//servizi p2p
            //    var errors = {};
            //    var senderAliasesType = {};
            //    senderAliasesType.senderAliasType = new Array();
            //    if (!data.description) {
            //        errors.description = "Inserire una causale";
            //    }
            //    if (!data.destination) {
            //        errors.destination = "Inserire un destinatario";
            //    }
            //    if (!data.firstName) {
            //        errors.firstName = "Inserire un nome";
            //    }
            //    if (!data.lastName) {
            //        errors.lastName = "Inserire un cognome";
            //    }
            //    else {
            //        //validazione in caso di destinatari multipli
            //        var inputs = data.destination.split(',');
            //        var errorMsg = "Inserire un destinatario valido";
            //        if (inputs.length > 1) {
            //            errorMsg = "Inserire destinatari validi";
            //        }
            //        for (var i = 0; i < inputs.length; i++) {
            //            var input = inputs[i];
            //            var senderAlias = {};
            //            var isMail = /^[\-\.\w]+@([\-a-zA-Z_0-9]+?\.)*[\-a-zA-Z_0-9]+?\.[a-zA-Z]{2,3}$/.test(input);
            //            var isMobile = /^([00|\+]+\d{2})?3\d{9}$/.test(input);
            //            if (isMail === true) {
            //                senderAliasesType.senderAliasType[i] = {
            //                    aliasType: 'E',
            //                    aliasValue: input,
            //                    name: data.firstName,
            //                    surname: data.lastName
            //                }
            //            }
            //            else if (isMobile === true) {
            //                senderAliasesType.senderAliasType[i] = {
            //                    aliasType: 'M',
            //                    aliasValue: input,
            //                    name: data.firstName,
            //                    surname: data.lastName
            //                }
            //            }
            //            else {
            //                errors.destination = errorMsg;
            //            }
            //        }
            //    }
            //    if (!(parseFloat(data.amount) > 0) || data.amount === '' || isNaN(data.amount)) {
            //        errors.amount = "Inserire un importo valido";
            //    }
            //    if (!_.isEmpty(errors)) {
            //        return { model: null, errors: errors };
            //    }
            //    else {
            //        var model = API.getRequestModel(data, senderAliasesType);
            //        return { model: model, errors: errors };
            //    }
            //});
            Appersonam.reqres.setHandler("p2p:deny", function (paymentReferenceNumber, reason) {
                var paymentReference = { paymentReferenceNumber: paymentReferenceNumber };
                return new Entities.P2PDeny({
                    reason: reason,
                    paymentReference: paymentReference
                });
            });
            Appersonam.reqres.setHandler("p2p:cancel:pending", function (paymentReferenceNumber) {
                var paymentReference = { paymentReferenceNumber: paymentReferenceNumber };
                return new Entities.P2PCancelPending({
                    reason: 'cancelling',
                    paymentReference: paymentReference
                });
            });
            Appersonam.reqres.setHandler("p2p:grant", function (paymentReferenceNumber, receiverName, receiverSurname, idConto) {
                var paymentReference = { paymentReferenceNumber: paymentReferenceNumber };
                return new Entities.P2PGrant({
                    paymentReference: paymentReference,
                    instrumentValue: idConto,
                    receiverName: receiverName,
                    receiverSurname: receiverSurname
                });
            });
            Appersonam.reqres.setHandler("p2p:transfer:dates", function (destination) {
                return API.getTransferDates(destination);
            });
            Appersonam.reqres.setHandler("p2p:transfer:validation", function (data, aliasIb) {
                return API.validateTransferData(data, aliasIb);
            });
            Appersonam.reqres.setHandler("p2p:transfer:model", function (data) {
                return new Entities.ConfirmTransfer({ amount: data.amount, description: data.description });
            });
            Appersonam.reqres.setHandler("transfer:dates", function (dates) {
                return new Entities.TransferDates(dates);
            });
            Appersonam.reqres.setHandler("new:peer", function () {
                return new Entities.Peer();
            });
            Appersonam.reqres.setHandler('validate:transfer', function (data, aliasib) {
                return API.getTransferDates(data, aliasib);
            });

        });
        return;
    });